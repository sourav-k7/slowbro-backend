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
  //   (new Date()).toUTCString(),
  completionTime: Date,
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
  comment: String,
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
