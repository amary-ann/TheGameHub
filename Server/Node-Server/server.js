require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const cors = require("cors");
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
app.use(cors(corsConfig));
app.use("/test", TestRouter);

// Socket.io middlewares
const tictactoe = io.of("/tictactoe");
// find a way to target all namespaces
tictactoe.use(SocketCookieParser);
tictactoe.use(requireAuth);
tictactoe.use(SocketSession);
io.use(SocketCookieParser);
io.use(requireAuth);

tictactoe.on("connection", async (socket) => {
  InitSocket(socket);

  socket.on("play:random-user", async (data) => {
    // get all users in lobby
    const playersInLobby = await tictactoe.in("lobby").fetchSockets();

    // check if there are users in lobby
    if (playersInLobby.length > 0 && !playersInLobby.includes(socket)) {
      const gameRoom = uniqid("gameroom");
      const player = playersInLobby[0]; // first player in lobby

      // remove found player from lobby
      player.leave("lobby");

      // add players to a new game room
      socket.join(gameRoom);
      player.join(gameRoom);

      // notify players of found user
      player.emit("found match", socket.userid, socket.username);
      socket.emit("found match", player.userid, player.username);
    } else {
      // add this user to lobby & notify user to wait
      socket.join("lobby");
      socket.emit("waiting in lobby", "waiting");
    }
  });

  socket.on("test", async (ei) => {
    const playersInLobby = await tictactoe.in("lobby").fetchSockets();
    for (const player of playersInLobby) {
      console.log(player.username);
    }
    if (playersInLobby.length === 0) console.log("empty");
  });
  socket.on("play:friend", async (data) => {
    // create a room and add this user to it
    // emit a request event in the users username
    // const roomid = some random room id
    //socket.join(roomid)
    //socket.to(data.friend).emit("game request",{game:'tictactoe',roomid,requestee})
  });

  socket.on("next-player", (data) => {
    // emits an event to the other player
    console.log(data);
    // socket.to(socket.userid).to(data.roomid).emit("turn", { changes: "" });
    // socket.session.room = "something";
  });

  socket.on("gameOver", (data) => {
    // ends the game
    // the game is ended if a user wins or they draw
  });

  socket.on("disconnect", async () => {
    console.log("client disconnected", socket.userid);
  });
});

io.on("connection", async (socket) => {
  const userSockets = await io.in(socket.userid).fetchSockets();
  if (userSockets.length === 0)
    socket.broadcast.emit("user has joined", socket.userid, socket.username);

  // add socket to its userid room
  socket.join(socket.userid);

  console.log(socket.username);

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("disconnecting", async () => {
    // check if all sockets with this username are disconnected
    const userSockets = await io.in(socket.userid).fetchSockets();
    if (userSockets.length === 1) {
      socket.broadcast.emit("user has left", socket.userid, socket.username);
    }
  });
});

// start server
server.listen(port, async () => {
  await startRedis();
  console.log(`Listening on port ${port}...`);
});
