const express = require("express");
const {
  loginUser,
  createUser,
  UserData,
} = require("../controllers/userControllers");
const { fetchuser } = require("../middleware/fetchuser");
const router = express.Router();
// Signup
router.route("/create").post(createUser);
// Login
router.route("/login").post(loginUser);
// Get user data
router.route("/").get(fetchuser, UserData);

module.exports = router;
