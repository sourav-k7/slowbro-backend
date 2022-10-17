const express = require("express");
const { newTask, updateTask, markAsComplete, getAllTask } = require("../controllers/task");
const tokenCheck = require('../middleware/tokenCheck');

const router = express.Router();

router.post('/new',tokenCheck,newTask);
router.post('/update',tokenCheck,updateTask);
router.post('/complete',tokenCheck,markAsComplete);
router.get('/all',tokenCheck,getAllTask);

module.exports = router;
