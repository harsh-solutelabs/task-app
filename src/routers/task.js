const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

//To Add Task-----------------------------------
router.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Fetching all tasks-----------------------------------
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});
//Fetching one task-------------------------------------
router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Updating Task----------------------------------------
router.patch("/task/:id", async (req, res) => {
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
    const task = await Task.findById(req.params.id);
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
router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
