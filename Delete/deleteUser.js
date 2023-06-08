const express = require("express");
const userModal = require("../Modal/userModal")
const app = express();
const { body, validationResult, param, check } = require('express-validator');

app.delete("/:userID",
check("userID")
.notEmpty()
.withMessage("Kindly enter User ID")
.isLength({ min: 8, max: 8 })
.withMessage("UserID must be 8 characters only")
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
          const user = await userModal.deleteOne({
            userID: request.params.userID
          });
          if (user.deletedCount > 0) {
            response.status(200).json({
              success: true,
              message: 'User deleted successfully',
              data: user
            })
          }
          else {
            response.status(200).json({
              success: true,
              message: 'Could not found the respective userID',
              data: user
            })
          }
        }
      }
      catch (error) {
        response.status(500).send(error);
      }
    }
  )

module.exports = app;