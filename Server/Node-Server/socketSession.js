const { redisClient } = require("./redis/index");

/**
 *
 * @param {String} userid
 * @returns {Object}
 * it returns the session object
 */
const CreateSession = async (userid) => {
  try {
    // proxy allows for operations between get and set calls
    const proxy = createProxy({ userid }, userid);

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
  // search session store for this session
  const session = await redisClient.get(userid.toString());

  if (session) {
    // parse the session from json, create and return a proxy to the parsed session
    const parsedSession = JSON.parse(session);
    const proxySession = createProxy(parsedSession, userid);
    return proxySession;
  }

  return null;
};

/**
 *
 * @param {Object} object
 * @param {String} userid
 * @returns proxy for the target object
 */
const createProxy = (object, userid) => {
  // The handler defines what happens when operations are
  // carried out on the target object i.e operations like get,set,delete
  const handler = {
    // updates the session in the redis store everytime the object is modified
    async set(target, prop, value) {
      // prevent userid mutation
      if (prop === "userid") {
        throw new Error("userid cannot be changed once initialised");
      }

      // set property on the target object
      target[prop] = value;

      // update the redis session store
      await redisClient.set(userid, JSON.stringify(target));
      return true;
    },
  };
  return new Proxy(object, handler);
};
module.exports = { CreateSession, FindSession };
