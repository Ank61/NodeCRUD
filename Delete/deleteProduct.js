const express = require("express");
const productModal = require("../Modal/productModal");
const app = express();

app.post("/",  async(request, response) => {
    const user =await productModal.deleteOne({
        userID: request.body.userID
    });
  
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = app;