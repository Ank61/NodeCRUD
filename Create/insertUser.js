const express = require("express");
const userModal = require("../Modal/userModal")
const app = express();

app.post("/", async (request, response) => {
  const user = new userModal({
    userID: request.body.userID,
    userName: request.body.userName
  });

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;