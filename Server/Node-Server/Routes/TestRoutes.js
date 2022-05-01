const { Router } = require("express");
const router = Router();
const { testJwt } = require("../Controllers/UserController");

router.post("/jwt", testJwt);

module.exports = router;
