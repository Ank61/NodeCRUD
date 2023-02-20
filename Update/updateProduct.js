const express = require("express");
const productModal = require("../Modal/productModal");
const app = express();

app.post("/",  async(request, response) => {
    const user =await productModal.updateOne(
      {userID: request.body.userID}, 
      {$set:{
        productID: request.body.productID,
        productName: request.body.productName,
        productPrice:request.body.productPrice
    }})
  
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = app;