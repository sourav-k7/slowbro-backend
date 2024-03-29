const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
	name:{
		type:String,
		required:true,
	},
	status:{
		type:String,
		enum:['active','complete'],
		default:'active',
	},
	user:{
		type:mongoose.Types.ObjectId,
		ref:"User",
	},
	completionTime: Date,
});

module.exports = mongoose.model("Project", ProjectSchema);
