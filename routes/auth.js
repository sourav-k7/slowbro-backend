const express = require("express");
const { login, signup, getProfile } = require("../controllers/auth");
const tokenCheck = require("../middleware/tokenCheck");

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.get('/profile',tokenCheck,getProfile);

module.exports = router;
