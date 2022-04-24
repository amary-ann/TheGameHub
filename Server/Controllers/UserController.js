const post_LoginUser = (req, res) => {
  req.session.authenticated = true;
  res.status(200).json({ success: "ok", userId: "8329389238" });
};

module.exports = { post_LoginUser };
