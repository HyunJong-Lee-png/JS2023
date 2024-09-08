const User = require('./userSchema');

const userController = {};

userController.getUsers = async () => {
  const users = await User.find({});
  return users;
}

userController.createUser = async (name, age, married) => {
  const newUser = await User.create({
    name,
    age,
    married,
  });
  return newUser;
}

userController.updateUser = async (userId, comment) => {
  const user = await User.findById(userId);
  user.comment = comment;
console.log('3213:',user.comment)
  user.save();
  console.log(user.comment);
  return user;
};

userController.deleteUser = (userId) => {
  User.deleteOne({ _id: userId });
};

module.exports = userController;