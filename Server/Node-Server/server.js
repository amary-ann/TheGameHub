require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const {
  requireAuth,
  SocketCookieParser,
} = require("./Controllers/socketController");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/TestRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app, { cors: corsConfig });
const io = new Server(server, { cors: corsConfig });

const port = process.env.PORT || 8080; // use port 8080 if environment port is not specified

// Middlewares
// Express middlewares
app.use(express.json());
app.use(cors(corsConfig));
//app.use(sessionMiddleware);
app.use("/test", UserRouter);

// Socket.io middlewares
io.use(SocketCookieParser);
io.use(requireAuth);

io.on("connection", (socket) => {
  socket.emit("Welcome", "You're welcome");
  console.log("hello");
  socket.on("message", (data) => {
    console.log(data);
  });
});

// connect to db then start server
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
