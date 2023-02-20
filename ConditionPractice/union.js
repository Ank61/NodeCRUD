const express = require("express");
const userModal = require("../Modal/userModal");
const productModal = require("../Modal/productModal");
// const { response } = require("./notCommon");
const app = express()

app.get("/", async (request, response) => {
    userModal.aggregate([
        {
            "$set": {
                "userRole": "user"
            }
        },
        {
            "$unionWith": {
                coll: "products"
            }
        },
        {
            "$project": { "userName": 1, 
            "productName": 1, 
            "userRole": 1 }
        },
        {
            "$set": {
                "productCategory": "Normal"
            }
        },
]).exec(function (err, result) {
        response.send(result)
    })
})
module.exports = app;