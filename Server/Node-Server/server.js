require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const {
  requireAuth,
  SocketCookieParser,
} = require("./Controllers/socketController");

const express = require("express");
const cors = require("cors");
const TestRouter = require("./Routes/TestRoutes");
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
app.use("/test", TestRouter);

// Socket.io middlewares
const tictactoeNamespace = io.of("/tictactoe");
tictactoeNamespace.use(SocketCookieParser);
tictactoeNamespace.use(requireAuth);
io.use(SocketCookieParser);
io.use(requireAuth);

tictactoeNamespace.on("connection", (socket) => {
  socket.join(socket.userid);
  socket.emit("Welcome", "You're welcome to my socket");

  socket.on("play with random user", (data) => {
    // do something with the data
    console.log(data);
  });
});

io.on("connection", (socket) => {
  socket.emit("Welcome", "You're welcome");
  console.log(socket.userid);

  socket.on("message", (data) => {
    console.log(data);
  });
});

// start server
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
