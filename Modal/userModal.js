const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: Number,
      },
    userName: {
        type: String,
      },
});
const fetchModal = mongoose.model("user", userSchema);
module.exports = fetchModal;