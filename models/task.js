const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img_url: {
    type: String,
  },
  subtask: [
    {
      task: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["unstarted", "started", "completed"],
      },
    },
  ],
  status: {
    type: String,
    enum: ["unstarted", "started", "completed"],
    default:'unstarted',
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default:'medium',
  },
  completionTime: {
    type:Date,
  },
  point: Number,
  doubt: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
      },
    },
  ],
  comments: [String],
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  orderId:Number,
});

module.exports = mongoose.model("Task", TaskSchema);
