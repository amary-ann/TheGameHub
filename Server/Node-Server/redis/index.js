const { createClient } = require("redis");

const redisClient = createClient();

const startRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { redisClient, startRedis };
