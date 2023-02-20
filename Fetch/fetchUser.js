const express = require("express");
const userModal =require("../Modal/userModal")
const app = express();

app.get("/", async (request, response) => {
     await userModal.find({}, (error, data)=> {
        if (data) {
            response.send(data);
        } else {
            response.status(500).send(error);
        }}
        ).clone().catch(function(err){console.log(err)});
  });
  module.exports = app;