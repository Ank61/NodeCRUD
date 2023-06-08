const express = require("express");
const productModal = require("../Modal/productModal");
const app = express();
const { body, validationResult, param,check } = require('express-validator');

app.put("/:productID",

check('userID')
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
.withMessage('Enter digits only'),

async (request, response) => {
    const errors = validationResult(request);
    try {
      if (!errors.isEmpty()) {
        return response.status(400).json({
          success: false,
          errors: errors.array()
        });
      } else {
        const user = await productModal.updateOne(
          { productID: request.params.productID },
          {
            $set: {
              userID: request.body.userID, //Required
              productID: request.params.productID,//Cannot change the productID
              productName: request.body.productName,//Required
              productPrice: request.body.productPrice
            }
          })
        if (user.modifiedCount > 0 && user.matchedCount > 0) {
          response.status(200).json({
            success: true,
            message: 'Product Updated Successfully',
            data: user
          })
        }
        else if (user.matchedCount < 1) {
          response.status(200).json({
            success: true,
            message: 'Could not found the respective productID',
            data: user
          })
        }
        else {
          response.status(400).json({
            success: true,
            message: 'Updation failed',
            data: user
          })
        }
      }
    } catch (error) {
      response.status(500).send(error);
    }
  });
module.exports = app;