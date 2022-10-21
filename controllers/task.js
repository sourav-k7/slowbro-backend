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
    orderId,
	} = req.body;
	const newTask = await taskModel.create({ 
    user:req.user,
		task,
		description,
		img_url,
		subtask,
		status,
		point,
		doubt,
		comments,
		project,
    orderId
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
    ).lean();
	res.json({
		message:'Task updated',
		data:updatedTask,
	})
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

module.exports.swapTask = async(req,res,next)=>{
  try {
      const {
        dragTaskId,
        dragTaskOrderId,
        dropTaskId,
        dropTaskOrderId
      } = req.body;
      await taskModel.findOneAndUpdate(dragTaskId,{orderId:dropTaskOrderId});
      await taskModel.findOneAndUpdate(dropTaskId,{orderId:dragTaskOrderId});
  } catch (error) {
    next(new ErrorHandler(error,500));
  }
}

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

module.exports.getAllPendingTask = async (req,res,next)=>{
  try {
    const user = req.user;
    const taskList = await taskModel.find({user:user,status:{$in:["unstarted", "started"]}}).lean();
    res.json({
      data:taskList,
    })
  } catch (error) {
    next(new ErrorHandler(error,500));
  }
}