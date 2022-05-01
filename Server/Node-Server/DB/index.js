require("dotenv").config();
const mongoose = require("mongoose");

const startDB = async (callback) => {
  try {
    const connection = await mongoose.connect(process.env.DBURI);
    if (connection) {
      callback();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { startDB };
