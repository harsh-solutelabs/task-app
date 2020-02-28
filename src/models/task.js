const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  describition: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    optional: true,
    default: false
  }
});

module.exports = Task;
