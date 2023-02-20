const express = require("express");
const productModal = require("../Modal/productModal");
const { db } = require("../Modal/userModal");
const userModal = require("../Modal/userModal")
const app = express();

app.get("/", async (request, response) => {
     await productModal.find({}, (error, data)=> {
        if (data) {
            response.send(data);
        } else {
            response.status(500).send(error);
        }}
        ).clone().catch(function(err){console.log(err)});

  });
  module.exports = app;