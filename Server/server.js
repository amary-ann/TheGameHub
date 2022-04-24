require("dotenv").config();
const {
  corsConfig,
  sessionMiddleware,
  wrap,
} = require("./Controllers/serverController");
const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/UserRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app, { cors: corsConfig });
const io = new Server(server, { cors: corsConfig });

const port = process.env.PORT || 8080; // use port 8080 if environment port is not specified

// Middlewares
// Express middlewares
app.use(cors(corsConfig));
app.use(sessionMiddleware);
app.use("/users", UserRouter);

// Socket.io middlewares
io.use(wrap(sessionMiddleware));
io.use((socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    console.log("successfully connected");
  }
  next();
});

io.on("connection", (socket) => {
  socket.emit("Welcome", "You're welcome");
  console.log("hello");
});

// initialise server
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
