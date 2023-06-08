const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        unique : true,
      },
    userName: {
        type: String,
      },
    email : {
      type: String,
      unique: true,
    },
    phone :{
      type : String,
      unique :true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    gender :{
      type: String,
    }
});
const fetchModal = mongoose.model("user", userSchema);
module.exports = fetchModal;