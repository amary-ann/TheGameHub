const requireAuth = (socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    console.log("client connected", session.userid);
    next();
  }
  next(new Error("client unauthorised: please login"));
};

module.exports = { requireAuth };
