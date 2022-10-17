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
	} = req.body;
	const newTask = await taskModel.create({ 
		task,
		description,
		img_url,
		subtask,
		status,
		point,
		doubt,
		comments,
		project,
	});
	res.json({
		message:'Task created',
		data:newTask,
	})
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      taskId,
      task,
      description,
      img_url,
      subtask,
      status,
      point,
      doubt,
      comments,
      project,
    } = req.body;
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
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
      },
      { new: true }
    );
	res.json({
		message:'Task updated',
		data:updatedTask,
	})
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.markAsComplete = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    await taskModel.findByIdAndUpdate(taskId, {
      completionTime: new Date().toUTCString(),
      status: "completed",
    });
    res.json({
      message: "Task Completed",
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.getAllTask = async (req,res,next)=>{
  try {
    const user = req.user;
    const taskList = await taskModel.find({user:user}).lean();
    res.json({
      data:taskList,
    })
  } catch (error) {
    next(new ErrorHandler(error,500));
  }
}