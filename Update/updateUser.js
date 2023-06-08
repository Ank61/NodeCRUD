const express = require("express");
const userModal = require("../Modal/userModal")
const app = express();
const { body, validationResult, param, check } = require('express-validator');

app.put("/:userID",

  //Conditions for body object
  check('userName')
  .notEmpty()
  .withMessage("Kindly Enter Username")
  .isLength({ min: 6, max: 30 })
  .withMessage('Username must have atleast 6 characters long')
  .matches(/^[A-Za-z0-9_.]+$/)
  .withMessage('Enter alphabhets or digits with no space'),
  
  
  check("userID")
  .notEmpty()
  .withMessage("Kindly enter User ID")
  .isLength({ min: 8, max: 8 })
  .withMessage("UserID must be 8 characters only")
  .matches(/^[0-9]+$/)
  .withMessage('Enter Numbers only'),

check("phone")
  .isLength({ min: 10, max: 10 })
  .withMessage("Phone Numbermust be 10 characters only")
  .matches(/^[0-9]+$/)
  .withMessage('Enter Numbers only'),

check("gender")
  .matches(/^[A-Za-z]+$/)
  .withMessage('Enter alphabets only')
  .optional({nullable: true}),

check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Email is not valid")
  
  
  
 , async (request, response) => {
    const errors = validationResult(request);
    try {
      if (!errors.isEmpty()) {
        return response.status(400).json({
          success: false,
          errors: errors.array()
        });
      } else {
        const user = await userModal.updateOne({ userID: request.params.userID },
          {
            $set: {
              userID: request.params.userID, //Cannot change also required
              userName: request.body.userName ,//Required
              email: request.body.email,
              gender: request.body.gender,
              phone: request.body.phone
            }
          })
        if (user.modifiedCount > 0 && user.matchedCount > 0) {
          response.status(200).json({
            success: true,
            message: 'User Updated Successfully',
            data: user
          })
        }
        else if (user.matchedCount < 1) {
          response.status(200).json({
            success: true,
            message: 'Could not found the respective UserID',
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
  }
)

module.exports = app;