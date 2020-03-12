const mongoose = require("mongoose");
const validator = require("validator");
// const User= require("../models/user")

const Task = mongoose.model("Task", {
  describition: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    optional: true,
    default: false
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  }
});

module.exports = Task;
