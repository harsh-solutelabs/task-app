require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5e591367ea1cf9224797f788")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(incomplete => {
    console.log(incomplete);
  })
  .catch(e => {
    console.log(e);
  });
