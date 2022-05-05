const { redisClient } = require("./redis/index");

const CreateSession = async (userid) => {
  try {
    // return session object

    const handler = {
      async set(target, prop, value) {
        if (prop === "userid") {
          throw new Error(
            "sorry the userid cannot be changed once initialised"
          );
        }
        // default operation
        target[prop] = value;

        // update the redis session object
        await redisClient.set(userid, JSON.stringify(target));
        return true;
      },
    };

    const proxy = new Proxy({ userid }, handler);

    const session = await redisClient.set(userid, JSON.stringify({ userid }));

    if (session) return proxy;
  } catch (error) {
    console.log(error.message);
  }
};

const FindSession = async (userid) => {
  const session = await redisClient.get(userid.toString());
  if (session) {
    const parsedSession = JSON.parse(session);
    return parsedSession;
  }
  return null;
};

module.exports = { CreateSession, FindSession };
