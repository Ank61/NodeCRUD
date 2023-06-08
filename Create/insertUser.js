const express = require("express");
const userModal = require("../Modal/userModal")
const app = express();
const { body, validationResult, param, check } = require('express-validator');

app.post("/", check('userName')
  .notEmpty()
  .withMessage("Kindly Enter Username")
  .isLength({ min: 6, max: 30 })
  .withMessage('Username must have atleast 6 characters long')
  .matches(/^[A-Za-z0-9_.]+$/)
  .withMessage('Enter alphabhets only'),

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
    .withMessage('Enter Numbers only'),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid")

  , async (request, response) => {
    const errors = validationResult(request);
    const user = new userModal({
      userID: request.body.userID,
      userName: request.body.userName,
      email: request.body.email,
      gender: request.body.gender,
      phone: request.body.phone
    });
    try {
      if (!errors.isEmpty()) {
        return response.status(400).json({
          success: false,
          errors: errors.array()
        });
      }
      else {
        await user.save();
        response.status(200).send({ success: true, message: "User inserted successfully", response: user });
      }
    }
    catch (error) {
      if (error.code == 11000) {
        response.status(400).send({ success: true, message: "Insertion failed, Dublicate field found", response: user });
      }
      else {
        response.status(400).send(error);
      }
    }

  })

module.exports = app;