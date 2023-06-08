const express = require("express");
const productModal = require("../Modal/productModal");
const { db } = require("../Modal/userModal");
const userModal = require("../Modal/userModal")
const authenticationUser =require('../Modal/authenticate')
const app = express();
const jwt = require('jsonwebtoken') 
app.get("/", async (request, response) => {

// const {token} = request.body;
// if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token,"123");
//     request.user = decoded;
//     console.log(decoded)
//     const email = decoded.email
//     const check =await authenticationUser.findOne({email})
//     if(check){
//         response.status(200).send("Authenticated")
//     }
//     response.status(400).send("Not AUTHENTICATED")
//   } catch (err) {
//     return response.status(401).send("Invalid Token");
//   }
     await productModal.find({}, (error, data)=> {
        if (data) {
            console.log(request)
            response.send(data);
        }
        else {
            response.status(500).send(error);
        }}
        ).clone().catch(function(err){console.log(err)});

  });
  app.get("/:productID", async (request, response) => {
    await productModal.find({"productID" : request.params.productID } , (error, data)=> {
       if (data) {
           response.send(data);
       } 
       else {
           response.status(500).send(error);
       }}
       ).clone().catch(function(err){console.log(err)});

 });
  module.exports = app;