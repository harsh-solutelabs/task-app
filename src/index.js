const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3535;

app.use(express.json());
//To Add Users---------------------------------
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//To Add Task-----------------------------------
app.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//To Find All users------------------------------
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500);
  }
});
//To Search one users-------------------------------
app.get("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(505).send();
  }
});
//Fetching all tasks-----------------------------------
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});
//Fetching one task-------------------------------------
app.get("/task/:id", async (req, res) => {
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
//Updating users----------------------------------------
app.patch("/user/:id", async (req, res) => {
  // const _id = req.param.id;
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isValidateOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log(isValidateOperation);
  if (!isValidateOperation) {
    return res.status(400).send({ erro: "invalid error" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//Updating Task----------------------------------------
app.patch("/task/:id", async (req, res) => {
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
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log("server " + port);
});
