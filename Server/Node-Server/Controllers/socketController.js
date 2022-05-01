require("dotenv").config();
const cookieParser = require("cookie");
const jwt = require("jsonwebtoken");

const requireAuth = (socket, next) => {
  if (socket.cookies && socket.cookies.token) {
    try {
      jwt.verify(socket.cookies.token, process.env.SECRET, (err, decoded) => {
        socket.userid = decoded.userid;
        socket.username = decoded.username;
      });
      next();
    } catch (error) {
      next(new Error("You need to be logged in"));
      console.log(error);
    }
  } else {
    next(new Error("You need to be logged in"));
  }
};

const SocketCookieParser = (socket, next) => {
  const { cookie } = socket.request.headers;
  if (cookie) {
    const cookies = cookieParser.parse(cookie);
    socket.cookies = cookies;
  }
  next();
};

module.exports = { requireAuth, SocketCookieParser };
