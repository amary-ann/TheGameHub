require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const TestRouter = require("./Routes/TestRoutes");
const {
  requireAuth,
  SocketCookieParser,
  SocketSession,
} = require("./Middleware/socketMiddleware");
const { InitSocket } = require("./Controllers/socketController");
const express = require("express");
const { redisClient, startRedis } = require("./redis/index");

const uniqid = require("uniqid");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app, { cors: corsConfig });
const io = new Server(server, { cors: corsConfig });

const port = process.env.PORT || 8080; // use port 8080 if environment port is not specified

// Middlewares

// Express middlewares
app.use(express.json());
app.use("/test", TestRouter);

// Socket.io middlewares
const tictactoeNamespace = io.of("/tictactoe");
// find a way to target all namespaces
tictactoeNamespace.use(SocketCookieParser);
tictactoeNamespace.use(requireAuth);
tictactoeNamespace.use(SocketSession);
io.use(SocketCookieParser);
io.use(requireAuth);

tictactoeNamespace.on("connection", async (socket) => {
  InitSocket(socket);

  socket.on("play:random-user", async (data) => {
    // check waiting queue for waiting users
    // pair user with another waiting user

    const user = await redisClient.sRandMember("waitingPlayers:tictactoe");

    if (user) {
      // create and add players to gameroom
      const gameRoom = uniqid("gameroom");

      await redisClient.sRem("waitingPlayers:tictactoe", user);

      tictactoeNamespace.in(user).socketsJoin(gameRoom);
      tictactoeNamespace.in(socket.userid).socketsJoin(gameRoom);

      // the second argument is "isStartingPlayer", this is only sent for turn based games
      tictactoeNamespace.to(socket.userid).emit("found-user", user, true);
      socket.to(user).emit("found-user", socket.userid, false);
    } else {
      // user for
      await redisClient.sAdd("waitingPlayers:tictactoe", socket.userid);
      socket.emit("waiting", "Searching for players");
    }

    console.log(data);
  });

  socket.on("play:friend", async (data) => {
    // create a room and add this user to it
    // emit a request event in the users username
    // const roomid = some random room id
    //socket.join(roomid)
    //io.to(data.friend).emit("game request",{game:'tictactoe',roomid,requestee})

    socket.emit("done", "done");
  });

  socket.on("next-player", (data) => {
    // emits an event to the other player
    socket.to(socket.userid).to(data.roomid).emit("turn", { changes: "" });
    socket.session.room = "something";
  });

  socket.on("gameOver", (data) => {
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
  console.log(`Listening on port ${port}...`);
});
