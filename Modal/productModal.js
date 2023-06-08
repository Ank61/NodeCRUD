const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    userID :{//Required
      type : String,//can be dublicate because user can buy may products
    },
    productID: {//Required
        type: String,
        unique :true,
      },
    productName: {//Required
        type: String,
      },
    productPrice : { //not a required field because customer prebook without knowing the price
        type: String,
      },
});
const fetchModal = mongoose.model("product", productSchema);
module.exports = fetchModal;