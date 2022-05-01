require("dotenv").config();
const jwt = require("jsonwebtoken");
const testJwt = async (req, res) => {
  const { name, email } = req.body;
  const token = jwt.sign(
    { username: name, userid: "fje48433jht49834h3" },
    process.env.SECRET
  );
  res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });
  res.json({ token });
};

module.exports = { testJwt };
