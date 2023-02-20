const express = require("express");
const userModal = require("../Modal/userModal")
const app = express();

app.get("/",(request, response) => {

     userModal.aggregate([
        {
            '$lookup': {
                from: 'products',
                 localField: 'userID',
                foreignField: '_id',
                as: 'Customers'
            }
        },
        { "$unset": ["userID","Customers"] }
    ]).exec(function (err, results) {
        response.send(results);
    })

    // userModal.aggregate([
        
    //     {
    //         '$lookup': {
    //             from: 'products',
    //             let : { "userID" : "$userID"},
    //             pipeline : [{
    //                 '$match' : {
    //                     '$expr' : { 
    //                         '$eq': ['$userID', '$$userID'
    //                   ]}}
    //                 }],
    //             as: 'Customers'
    //         }
    //     },
    //     {
    //         "$unset" : "Customers"
    //     },
    //     // { "$project": {"userName" : 1 , "userID" : 1, "Customers" : 1} },
        
    // ]).exec(function (err, results) {
    //     response.send(results);
    // })




});
module.exports = app;