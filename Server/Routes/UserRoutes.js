const { Router } = require("express");
const router = Router();
const { post_LoginUser } = require("../Controllers/UserController");

router.post("/login", post_LoginUser);

module.exports = router;
