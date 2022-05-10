require("dotenv").config();
const { corsConfig } = require("./Controllers/serverController");
const cors = require("cors");
const TestRouter = require("./Routes/TestRoutes");
const {
  requireAuth,
  SocketCookieParser,
  SocketSession,
} = require("./Middleware/socketMiddleware");
const express = require("express");
const { startRedis } = require("./redis/index");

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
  console.log("socket connnected", socket.userid);
  socket.join(socket.userid);

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
      socket.gameRoom = gameRoom;
      player.join(gameRoom);
      player.gameRoom = gameRoom;

      // notify players of found user
      player.emit("found match", socket.userid, socket.username);
      socket.emit("found match", player.userid, player.username);
    } else {
      // add this user to lobby & notify user to wait
      socket.join("lobby");
      socket.emit("waiting in lobby", "waiting");
    }
  });

  socket.on("play:friend", async (data) => {
    //check if friend is online
    const friendSockets = await tictactoe.in(data.userid).allSockets();
    const friendIsOnline = friendSockets !== 0;
    if (friendIsOnline) {
      // send friend a game request and add this player to the new gameroom
      const gameroom = uniqid();
      tictactoe
        .to(data.userid)
        .emit("game request", socket.userid, socket.username, gameroom);
      socket.join(gameroom);
    } else {
      socket.emit("friend offline", data.userid);
    }
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
  // send all online users to the client
  const users = [];
  for (let [_, userSocket] of io.of("/").sockets) {
    if (userSocket.username !== socket.username)
      users.push({
        userid: socket.userid,
        username: socket.username,
      });
  }

  socket.emit("users", users);

  // checks if user has other connected sockets and notifies other users
  const matchingSockets = await io.in(socket.userid).allSockets();
  if (matchingSockets.size === 0)
    socket.broadcast.emit("user has joined", socket.userid, socket.username);

  // add socket to its userid room
  socket.join(socket.userid);

  console.log(socket.username);

  socket.on("disconnect", async () => {
    // check if all sockets with this username are disconnected
    const matchingSockets = await io.in(socket.userid).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit("user has left", socket.userid, socket.username);
    }
  });
});

// start server
server.listen(port, async () => {
  await startRedis();
  console.log(`Listening on port ${port}...`);
});
