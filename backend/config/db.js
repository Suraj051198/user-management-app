// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try{
//        await mongoose.connect('mongodb://localhost:27017/formdata');

//     }
//     catch(err){
//         console.error('MongoDB connection error:', err);
//         process.exit(1); // Exit process with failure
//     }
//     console.log('MongoDB connected');
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/formdata');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
