require("dotenv").config();
const mongoose = require("mongoose");

const startDB = (callback) => {
  mongoose
    .connect(process.env.DBURI)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { startDB };
