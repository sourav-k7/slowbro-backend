const express = require("express");
const { newTask, updateTask, markAsComplete } = require("../controllers/task");
const tokenCheck = require('../middleware/tokenCheck');

const router = express.Router();

router('/new',tokenCheck,newTask);
router('/update',tokenCheck,updateTask);
router('/complete',tokenCheck,markAsComplete);

module.exports = router;
