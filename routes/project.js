const express = require("express");
const { createProject, markAsComplete, getAllProject, deleteProject } = require("../controllers/project");
const tokenCheck = require('../middleware/tokenCheck');

const router = express.Router();

router.post('/new',tokenCheck,createProject);
router.post('/complete',tokenCheck,markAsComplete);
router.get('/all',tokenCheck, getAllProject);
router.post('/delete',tokenCheck,deleteProject);

module.exports = router;
