const express = require("express");
const { login, register, logOut, getAllUsers } = require("../controller/auth");
const router = express.Router();

router.get("/users", getAllUsers)
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logOut);

module.exports.authRoute = router;
