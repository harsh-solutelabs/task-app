const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middlerware/auth")

//To Add Task-----------------------------------
router.post("/task",auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner:req.user._id
  })

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Fetching all tasks-----------------------------------
router.get("/tasks",auth, async (req, res) => {
  try {
    // const tasks = await Task.find({owner:req.user._id});
    await req.user.populate('tasks').execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e);
  }
});
//Fetching one task-------------------------------------
router.get("/task/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({_id,owner:req.user._id});

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Updating Task----------------------------------------
router.patch("/task/:id", auth,async (req, res) => {
  const allowedUpdates = ["completed", "describition"];
  const updates = Object.keys(req.body);

  const isValidateOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log(isValidateOperation);
  if (!isValidateOperation) {
    return res.status(400).send({ erro: "invalid error" });
  }
  try {
    // const task = await Task.findById(req.params.id);
    const task= await Task.findOne({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    updates.forEach(update => {
      return (task[update] = req.body[update]);
    });
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Delete Task-----------------------------------
router.delete("/task/:id",auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
