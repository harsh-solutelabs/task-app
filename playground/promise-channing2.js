require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5e591367ea1cf9224797f788")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(incomplete => {
//     console.log(incomplete);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndIncompleted = async (id, completed) => {
  const user = await Task.findByIdAndDelete(id);
  const userCompleted = await Task.countDocuments({ completed });
  return userCompleted;
};

deleteTaskAndIncompleted("5e59145bc4b1b323015b9a10", "true")
  .then(complete => {
    console.log(complete);
  })
  .catch(e => {
    console.log(e);
  });
