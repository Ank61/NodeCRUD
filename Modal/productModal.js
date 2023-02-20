const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    userID :{
      type : Number
    },
    productID: {
        type: String,
      },
    productName: {
        type: String,
      },
    productPrice : {
        type: String,
      },
});
const fetchModal = mongoose.model("product", productSchema);
module.exports = fetchModal;