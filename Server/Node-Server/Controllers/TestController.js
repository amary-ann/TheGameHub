require("dotenv").config();
const randomId = require("uniqid");
const jwt = require("jsonwebtoken");
const testJwt = async (req, res) => {
  const { name, email } = req.body;
  const token = jwt.sign(
    { username: name, userid: randomId() },
    process.env.SECRET
  );
  res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });
  res.json({ token });
};

module.exports = { testJwt };
