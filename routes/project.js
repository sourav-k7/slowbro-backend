const express = require("express");
const { createProject, markAsComplete } = require("../controllers/project");
const tokenCheck = require('../middleware/tokenCheck');

const router = express.Router();

// router.post("/login/email", userEmailLogin);
router.post('/new',tokenCheck,createProject);
router.post('/complete',tokenCheck,markAsComplete);

module.exports = router;
