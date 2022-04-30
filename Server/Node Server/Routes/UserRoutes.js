const { Router } = require("express");
const router = Router();
const {
  post_LoginUser,
  post_CreateUser,
} = require("../Controllers/UserController");

router.post("/login", post_LoginUser);
router.post("/create", post_CreateUser);

module.exports = router;
