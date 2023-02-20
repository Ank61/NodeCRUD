const express = require("express");
const productModal = require("../Modal/productModal")
const userModal = require("../Modal/userModal")
const app = express();
app.get("/" , async (request , response )=>{
    productModal.find({ "userID": { "$exists": false } }  ,(err,result)=>{
        if(!result){
            response.send("Empty array")
        }
        else{
            response.send(result)
        }
    })
})

// productModal.aggregate([
//     {
//         "$lookup" :{
//             from : "users",
//             localField : "userID",
//             foreignField : "_id",
//             as : "Products"
//         }
//     }
// ]).exec(function(err,result){
// response.send(result)
// })

// productModal.aggregate([
//         {
//             '$lookup' : {
//                 from  : "users",
//                 let : { "userD" : "$userID"},
//                 pipeline : [{
//                     '$match' :{ '$expr' :
//                      {'$ne' : 
//                       ["$userID" , "$$userD"]
//                     }
//                 }
//             }],
//                 as : "Customers"
//             }
//         },
        // {
            
        //         //     '$match' :{ '$expr' :
        //         //      {'$ne' : '$Customers.userID'
        //         //     }
        //         // }
        // },
        // {
        //     '$project':
        //        {
        //          userName: 0,
        //         //   userID :0,
        //         //  Customers : 0,
        //          _id: 0,
        //          __v : 0
        //        }
        //   },
        //   {
        //     '$addFields' :   "$Customers"
        //   }
    //   ]).exec(function(err,result){
    //   response.send(result)
    //   console.table(result)

    //   productModal.aggregate([
    //     {
    //         '$lookup' : {
    //             from  : "users",
    //             let : { "userID" : "$userID"},
    //             pipeline : [{
    //                 '$match' :{ '$expr' :
    //                  {'$ne' : 
    //                   ["$userID" , "$$userID"]
    //                 }
    //             }
    //         }],
    //             as : "Customers"
    //         }
    //     },
    //     {
    //         '$project':
    //            {
    //              userName: 0,
    //             //  userID :0,
    //              Customers : 0,
    //              _id: 0
    //            }
    //       },
    //     //   {
    //     //     '$unwind' :   "$Customers"
    //     //   }
    //   ]).exec(function(err,result){
    //   response.send(result)
    //      })

//    productModal.aggregate([
//         { $unionWith: { 
//             coll: "users" ,  pipeline: [ { '$project': { "userName": 1} }] }
//         }
//      ]).exec(function(err,result){
//            response.send(result)
//      })
module.exports = app;