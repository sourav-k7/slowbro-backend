const express = require("express");
const { newTask, updateTask, markAsComplete } = require("../controllers/task");
const tokenCheck = require('../middleware/tokenCheck');

const router = express.Router();

router.post('/new',tokenCheck,newTask);
router.post('/update',tokenCheck,updateTask);
router.post('/complete',tokenCheck,markAsComplete);

module.exports = router;
