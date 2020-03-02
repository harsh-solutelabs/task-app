const bcrypt = require("bcrypt");

const myFuction = async () => {
  const password = "harsh";
  const hashPass = await bcrypt.hash(password, 8);
  console.log(hashPass);
  console.log(password);

  const isMatch = await bcrypt.compare("harsh", hashPass);
  console.log(isMatch);
};

console.log(myFuction());
