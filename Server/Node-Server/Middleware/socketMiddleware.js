require("dotenv").config();
const cookieParser = require("cookie");
const jwt = require("jsonwebtoken");
const { FindSession, CreateSession } = require("../socketSession");

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

const SocketSession = async (socket, next) => {
  try {
    // check for existing session and create one if none
    const session = await FindSession(socket.userid);
    if (session) {
      socket.session = session;
      next();
    } else if (socket.userid) {
      const newSession = await CreateSession(socket.userid);
      if (newSession) {
        socket.session = newSession;
        socket.session.userid = socket.userid;
      }
    } else {
      console.log("some exception");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { requireAuth, SocketCookieParser, SocketSession };
