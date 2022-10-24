const express = require("express");
const {
  newTask,
  updateTask,
  markAsComplete,
  getAllPendingTask,
  swapTask,
  getTodaysCompletedTask,
  getPreviouslyCompletedTask,
} = require("../controllers/task");
const tokenCheck = require("../middleware/tokenCheck");

const router = express.Router();

router.get("/pending", tokenCheck, getAllPendingTask);
router.get('/today',tokenCheck,getTodaysCompletedTask);
router.get('/previous',tokenCheck,getPreviouslyCompletedTask);
router.post("/new", tokenCheck, newTask);
router.post("/update", tokenCheck, updateTask);
router.post("/complete", tokenCheck, markAsComplete);
router.post("/swap", tokenCheck, swapTask);

module.exports = router;
