const { Router } = require("express");
const router = Router();
const { testJwt } = require("../Controllers/TestController");

router.post("/jwt", testJwt);

module.exports = router;
