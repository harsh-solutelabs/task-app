const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password  can not contain 'password'");
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});


userSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()},'thiisnice')
  user.tokens =  user.tokens.concat({token})
  await user.save()
  return token
}

//Login
userSchema.statics.findByCredentials = async (email, password) => {
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to Login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable TO login");
  }
  return user;
};

//Hash The PLain Text Passsword
userSchema.pre("save", async function(next) {
  const user = this;
  // console.log("middleware");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
