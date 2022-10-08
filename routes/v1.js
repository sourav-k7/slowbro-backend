const express= require('express');
const router = express.Router();
const authRoute = require('./auth');
const taskRoute = require('./task');
const projectRoute = require('./project');

router.use('/auth',authRoute);
router.use('/task',taskRoute);
router.use('/project',projectRoute);

module.exports= router;