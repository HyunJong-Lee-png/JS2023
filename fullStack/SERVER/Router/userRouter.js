const express = require('express');
const router = express.Router();
const userController = require('../Schemas/user');

router.route('/')
  .get(async (req, res) => {
    try {
      const users = await userController.getUsers();
      res.json(users);
    } catch (err) {
      console.log(err.message);
    }
  })
  .post(async (req, res) => {
    try {
      const { name, age, married } = req.body;
      const newUser = await userController.createUser(name, age, married);
      res.json(newUser);

    } catch (err) {
      console.log(err.message);
    }
  })
  .patch(async (req, res) => {
    try {
      const { userId, comment } = req.body;
      const updateUser = await userController.updateUser(userId, comment);
      res.json(updateUser);
    } catch (err) {
      console.log(err.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId } = req.body;
      userController.deleteUser(userId);
      res.send('ok');
    } catch (err) {
      console.log(err.message);
    }
  })


module.exports = router;