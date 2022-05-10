const { redisClient } = require("../redis/index");

const InitSocket = async (socket) => {
  // adding a socket to a room identified by it's user id will help manage sessions
  console.log("socket connnected", socket.userid);
  await redisClient.sAdd("onlinePlayers", socket.userid);
  socket.join(socket.userid);
  if (socket.gameRoom) socket.join(socket.gameRoom);
};

module.exports = { InitSocket };
