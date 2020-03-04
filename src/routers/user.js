const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth=require("../middlerware/auth")
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
//To Find own profile----------------------------
router.get("/users/me",auth,async (req,res)=>{
  res.send(req.user)
})
//To Find All users------------------------------
router.get("/users",auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
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
//user Logout
router.post('/user/logout',auth,async(req,res)=>{
  try {
    req.user.tokens=req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })  
    await req.user.save()
    res.send({"message":"loggedout"})
  } catch (e) {
    res.status(500).send()
  }
})
//user Logout All
router.post('/user/logoutall',auth,async(req,res)=>{
  try {
    req.user.tokens =[]
    await req.user.save()
    res.send({"message":"loggedoutall"})
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router;
