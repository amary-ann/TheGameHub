require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const {
  requireAuth,
  SocketCookieParser,
} = require("./Controllers/socketController");

const express = require("express");
const { redisClient, startRedis } = require("./redis/index");
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

tictactoeNamespace.on("connection", async (socket) => {
  console.log("socket connnected", socket.userid);
  await redisClient.sAdd("onlinePlayers", socket.userid);

  socket.join(socket.userid);
  socket.emit("Welcome", "You're welcome to the tictactoe socket");

  socket.on("play with random user", async (data) => {
    // check waiting queue for waiting users
    // pair user with another waiting user

    const user = await redisClient.sRandMember("waitingPlayers:tictactoe");

    if (user) {
      // emit found user
      await redisClient.sRem("waitingPlayers:tictactoe", user);
      socket.emit("found user", user);
      socket.to(user).emit("found user", socket.userid);
    } else {
      // user for
      await redisClient.sAdd("waitingPlayers:tictactoe", socket.userid);
      socket.emit("waiting", "Searching for players");
    }

    console.log(data);
  });

  socket.on("play with friend", async (data) => {
    // create a room and add this user to it
    // emit a request event in the users username
    // const roomid = some random room id
    //socket.join(roomid)
    //io.to(data.friend).emit("game request",{game:'tictactoe',roomid,requestee})

    socket.emit("done", "done");
  });

  socket.on("next player", (data) => {
    // emits an event to the other player
    socket.to(socket.userid).to(data.roomid).emit("turn", { changes: "" });
  });

  socket.on("game over", (data) => {
    // ends the game
    // the game is ended if a user wins or they draw
  });

  socket.on("disconnect", async () => {
    await redisClient.sRem("waitingPlayers:tictactoe", socket.userid);
    await redisClient.sRem("onlinePlayers", socket.userid);
    console.log("client disconnected", socket.userid);
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
server.listen(port, async () => {
  await startRedis();
  await redisClient.set("hope", "hocks");
  console.log(`Listening on port ${port}...`);
});
