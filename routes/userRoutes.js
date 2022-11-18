const express = require('express');

const router = express.Router();

const { register,login ,setAvatar } = require("../controllers/usersController");


router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

module.exports = router