const express = require("express");
const productModal = require("../Modal/productModal");
const app = express();
const { body, validationResult, param,check } = require('express-validator');

app.post("/", check('userID')
.notEmpty()
.withMessage("Kindly enter User ID")
.isLength({ min: 8, max: 8 })
.withMessage("UserID must be 8 characters only")
.matches(/^[0-9]+$/)
.withMessage('Enter Numbers only'),

check('productID')
.notEmpty()
.withMessage("Kindly enter Product ID")
.isLength({ min: 8, max: 8 })
.withMessage("Product ID must be 8 characters only")
.matches(/^[0-9]+$/)
.withMessage('Enter Numbers only'),

check('productName')
.notEmpty()
.withMessage("Kindly Enter productName")
.isLength({ min: 6, max: 30 })
.withMessage('ProductName must have atleast 6 characters long')
.matches(/^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)*$/)
.withMessage('Enter aplphabhets only'),

check('productPrice')
.isLength({ min: 1, max: 30 })
.withMessage('ProductName must have atleast 1 characters long')
.matches(/^[0-9]+$/)
.withMessage('Enter digits only')

, async (request, response) => {
  const errors = validationResult(request);
        const user = new productModal({
          userID: request.body.userID , //Required
          productID: request.body.productID, //Required
          productName: request.body.productName,//Required
          productPrice: request.body.productPrice
        });
        try {
          if (!errors.isEmpty()) {
            return response.status(400).json({
              success: false,
              errors: errors.array()
            });
          }
          else{
            await user.save();
            response.status(200).send({
              success :true , 
              message : "Data sucessfully Inserted " ,
              response :user});
          }
        } catch (error) {
          if (error.code == 11000) {
            response.status(400).send({ success: true, message: "Insertion failed, Dublicate field found", response: user });
          }
          else {
            response.status(400).send(error);
          }
        }
 
});

module.exports = app;