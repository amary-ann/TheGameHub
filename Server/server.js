const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8080; // use port 8080 if environment port is not specified

// initialise server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
