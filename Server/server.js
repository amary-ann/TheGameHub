require("dotenv").config();
const {
  corsConfig,
  sessionMiddleware,
  wrap,
} = require("./Controllers/serverController");
const { requireAuth } = require("./Controllers/socketController");
const { startDB } = require("./DB/index");
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
app.use(express.json());
app.use(cors(corsConfig));
app.use(sessionMiddleware);
app.use("/users", UserRouter);

// Socket.io middlewares
io.use(wrap(sessionMiddleware));
io.use(requireAuth);

io.on("connection", (socket) => {
  socket.emit("Welcome", "You're welcome");
  console.log("hello");
});

// connect to db then start server

startDB(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
  console.log("sucessfully connected to db");
});
