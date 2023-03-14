const taskModel = require("../models/task");
const ErrorHandler = require("../utils/errorHandler");

module.exports.newTask = async (req, res, next) => {
  try {
    const {
      task,
      description,
      img_url,
      subtask,
      status,
      point,
      doubt,
      comments,
      project,
      priority
    } = req.body;
    const newTask = await taskModel.create({
      user: req.user,
      task,
      description,
      img_url,
      subtask,
      status,
      point,
      doubt,
      comments,
      project,
      priority,
    });
    res.json({
      message: "Task created",
      data: newTask,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      _id,
      task,
      description,
      img_url,
      subtask,
      status,
      point,
      doubt,
      comments,
      project,
      priority
    } = req.body;
    const updatedTask = await taskModel
      .findByIdAndUpdate(
        { _id: _id },
        {
          task,
          description,
          img_url,
          subtask,
          status,
          point,
          doubt,
          comments,
          project,
          priority,
        },
        { new: true }
      )
      .lean();
    res.json({
      message: "Task updated",
      data: updatedTask,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.markAsComplete = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    const task = await taskModel.findByIdAndUpdate(
      { _id: taskId },
      {
        completionTime: new Date().toUTCString(),
        status: "completed",
      },
      { new: true }
    );
    res.json({
      message: "Task Completed",
      data: task,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.getAllPendingTask = async (req, res, next) => {
  try {
    const user = req.user;
    const taskList = await taskModel
      .find({ user: user, status: { $in: ["unstarted", "started"] } })
      .sort({ _id: "asc" })
      .lean();
    res.json({
      data: taskList,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.getTodaysCompletedTask = async (req, res, next) => {
  try {
    const user = req.user;
    const taskList = await taskModel
      .find({
        user: user,
        status: "completed",
        completionTime: {
          $gte: new Date(new Date().setUTCHours(0, 0, 0, 0)).toUTCString(),
        },
      })
      .sort({ _id: "asc" })
      .lean();
    res.json({
      data: taskList,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.getPreviouslyCompletedTask = async (req, res, next) => {
  try {
    const skip = req.query.skip;
    const project = req.query.project;
    const user = req.user;
    const taskList = await taskModel
      .find({
        user: user,
        status: "completed",
        project:project,
        completionTime: {
          $lt: new Date(new Date().setUTCHours(0, 0, 0, 0)).toUTCString(),
        },
      })
      .skip(skip)
      .limit(20)
      .sort({ completionTime: "desc" })
      .lean();
    res.json({
      data: taskList,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.deleteTask = async (req,res,next)=>{
  try {
    const taskId = req.params.id;
    await taskModel.findByIdAndDelete({_id:taskId});
    res.json({
      message:'Task deleted'
    })
  } catch (error) {
    next(new ErrorHandler(error,500));
  }
}
