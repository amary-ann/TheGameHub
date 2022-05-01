require("dotenv").config();
const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
module.exports = { corsConfig };
