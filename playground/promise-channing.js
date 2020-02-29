require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("5e590f3a0300271f81d48573", { name: "Change" })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ name: "Browser" });
//   })
//   .then(count => {
//     console.log(count);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateNameGetCount = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name });
  const count = await User.countDocuments({ name });
  return count;
};

updateNameGetCount("5e590f3a0300271f81d48573", "harshmeht")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log("ddddddddd", e);
  });
