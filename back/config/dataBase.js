const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Se ha conectado a la base de datos');
    } catch (error) {
        console.log('error no se ha podido establecer la conexion a la base de datos', error);
        process.exit(1);        
    }
    
};

module.exports = connectDB;
