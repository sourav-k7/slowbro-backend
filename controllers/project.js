const projectModel = require('../models/project');
const ErrorHandler = require('../utils/errorHandler');


module.exports.createProject = async (req,res,next)=>{
	try {
		const {name} = req.body;
		const user = req.user;
		if(!name) new ErrorHandler('Project name is required',400);
		const newProject = await projectModel.create({name,user});
		res.json({
			data:newProject
		})
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}

module.exports.markAsComplete = async (req,res,next)=>{
	try {
		const {projectId} = req.body;
		await projectModel.findByIdAndUpdate(projectId,
			{completionTime:(new Date()).toUTCString(),
				status:'complete'
			});
		res.json({
			message:'Project Completed'
		})
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}

module.exports.getAllProject = async (req,res,next)=>{
	try {
		const user = req.user;
		const projectList = await projectModel.find({user:user}).lean();
		res.json({
			data:projectList
		})
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}