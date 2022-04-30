const User = require("../Models/UserModel");

const post_LoginUser = async (req, res) => {
  // check if user exists
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ username, email });
    if (user) {
      req.session.authenticated = true;
      req.session.userid = user._id;
      req.session.username = user.username;
      res
        .status(200)
        .json({ success: "ok", userid: user.user_id, username: user.username });
    }
  } catch (error) {
    res.status(400).json({ success: "failed", message: error.message });
  }
};

const post_CreateUser = async (req, res) => {
  const { username, email, firstname, lastname } = req.body;
  try {
    const user = await User.create({ username, email, firstname, lastname });
    if (user) {
      req.session.authenticated = true;
      req.session.userid = user._id;
      req.session.username = user.username;
      res
        .status(200)
        .json({ status: "ok", userid: user._id, username: user.username });
    }
  } catch (error) {
    // const { username, email, firstname, lastname } = error.errors;
    const errors = errorHandler(error);
    res.status(400).json({ status: "failed", errors });
  }
};

const get_verifyUsername = (req, res) => {
  const { username } = req.query.params;
  console.log(username);
  res.end();
};

module.exports = { post_LoginUser, post_CreateUser };

const errorHandler = (error) => {
  const userErrors = {};
  const { errors, code, keyValue } = error;

  // populate the userErrors with errors
  if (errors) {
    const { username, firstname, lastname, email } = errors;
    userErrors.username = username ? "Username is required" : undefined;
    userErrors.firstname = firstname ? "Firstname is required" : undefined;
    userErrors.lastname = lastname ? "Lastname is required" : undefined;
    userErrors.email = email ? "Email is required" : undefined;
  } else if (code === 11000) {
    const { username, email } = keyValue;
    userErrors.username = username ? "Username is unavailable" : undefined;
    userErrors.email = email
      ? "An account already exists with this email"
      : undefined;
  } else {
    userErrors.others = error.message;
  }
  return userErrors;
};
