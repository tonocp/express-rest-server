const mongoose = require('mongoose');

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('MongoDB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to MongoDB');
  }
};

module.exports = {
  mongodbConnection,
};
