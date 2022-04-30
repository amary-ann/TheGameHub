require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const maxAge = 1000 * 60 * 60 * 24; // a day in milliseconds

const sessionMiddleware = session({
  secret: process.env.SECRET,
  store: new MongoStore({
    mongoUrl: process.env.DBURI,
    collectionName: "sessions",
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge },
});

const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
module.exports = { corsConfig, sessionMiddleware, wrap };
