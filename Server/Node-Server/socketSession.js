const { redisClient } = require("./redis/index");

/**
 *
 * @param {String} userid
 * @returns {Object}
 * it returns the session object
 */
const CreateSession = async (userid) => {
  try {
    // define proxy handler
    // updates the session in the redis store everytime the object is modified
    const handler = {
      async set(target, prop, value) {
        // prevent userid mutation
        if (prop === "userid") {
          throw new Error("userid cannot be changed once initialised");
        }

        // default property set operation
        target[prop] = value;

        // update the redis session store
        await redisClient.set(userid, JSON.stringify(target));
        return true;
      },
    };

    // proxy allows for operations between get and set calls
    const proxy = new Proxy({ userid }, handler);

    // store the session in the redis store
    const session = await redisClient.set(userid, JSON.stringify(proxy));

    if (session) return proxy;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {String} userid
 * @returns returns the user session if it exists and null if otherwise
 */
const FindSession = async (userid) => {
  const session = await redisClient.get(userid.toString());
  if (session) {
    const parsedSession = JSON.parse(session);
    return parsedSession;
  }
  return null;
};

module.exports = { CreateSession, FindSession };
