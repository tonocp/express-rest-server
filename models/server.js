const express = require('express');
const cors = require('cors');

const { mongodbConnection } = require('../database/mongodb/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    /**
     * DB CONNECTIONS
     */
    this.connectMongoDB();

    /**
     * MIDDLEWARES
     */
    this.middlewares();

    /**
     * ROUTES
     */
    this.routes();
  }

  async connectMongoDB() {
    await mongodbConnection();
  }

  middlewares() {
    /**
     * CORS
     */
    this.app.use(cors());

    /**
     * BODY READ & PARSE
     */
    this.app.use(express.json());

    /**
     * PUBLIC DIRECTORY
     */
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
