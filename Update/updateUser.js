const express = require("express");
const userModal =require("../Modal/userModal")
const app = express();

app.post("/",  async(request, response) => {
    const user =await userModal.updateOne({userID: request.body.userID}, {$set:{
        userName: request.body.userName
    }})
  
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = app;