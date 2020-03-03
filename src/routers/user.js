const express = require("express");
const router = new express.Router();
const User = require("../models/user");
//To Add Users---------------------------------
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken()

    res.status(201).send({user,token});
  } catch (e) {
    res.status(500).send(e);
  }
});
//To Search one users-------------------------------
router.get("/user/:id", async (req, res) => {
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
//To Find All users------------------------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500);
  }
});
//Updating users----------------------------------------
router.patch("/user/:id", async (req, res) => {
  // const _id = req.param.id;
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isValidateOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  // console.log(isValidateOperation);
  if (!isValidateOperation) {
    return res.status(400).send({ erro: "invalid error" });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach(update => {
      return (user[update] = req.body[update]);
    });
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//Delete Users-----------------------------------
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(400).send({ error: "user not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
//user Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken()
    // console.log(user);
    res.send({user,token});
  } catch (e) {
    res.status(400).send();
  }
});
module.exports = router;
