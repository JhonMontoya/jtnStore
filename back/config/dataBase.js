const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('data base is connected');
    } catch (error) {
        console.log('error data base can´t connected', error);
        process.exit(1);        
    }
    
};

module.exports = connectDB;
