const express = require("express");
const productModal = require("../Modal/productModal");
const app = express();
const { body, validationResult, param, check } = require('express-validator');

app.delete("/:productID", check('productID')
.notEmpty()
.withMessage("Kindly enter product ID")
.isLength({ min: 8, max: 8 })
.withMessage("ProdcutID must be 8 characters only")
.matches(/^[0-9]+$/)
.withMessage('Enter Numbers only'),

async (request, response) => {
    const errors = validationResult(request);
      try {
        if (!errors.isEmpty()) {
          return response.status(400).json({
            success: false,
            errors: errors.array()
          });
        } else {
          const user = await productModal.deleteOne({
            productID: request.params.productID
          });
          if (user.deletedCount > 0) {
            response.status(200).json({
              success: true,
              message: 'Product deleted successfully',
              data: user
            })
          }
          else {
            response.status(200).json({
              success: true,
              message: 'Could not found the respective productID',
              data: user
            })
          }
        }
      } catch (error) {
        response.status(500).send(error);
      }
    }
);
module.exports = app;