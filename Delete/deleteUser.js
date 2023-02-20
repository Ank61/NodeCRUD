const express = require("express");
const userModal =require("../Modal/userModal")
const app = express();

app.post("/",  async(request, response) => {
    const user =await userModal.deleteOne({
        userID: request.body.userID
    });
  
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = app;