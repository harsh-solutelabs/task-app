const mongoose = require("mongoose");
const validator = require("validator");
// const User= require("../models/user")
const taskSchema=new mongoose.Schema({
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
},{
  timestamps:true
})
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
