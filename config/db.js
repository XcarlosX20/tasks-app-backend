const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = conectarDB;