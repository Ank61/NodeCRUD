const express = require('express')
require("dotenv").config();
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
let app = express(),fs = require('fs')
//for Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/Swagger.css"), 'utf8');
// const typeDefs = require('./GraphQL/TypeDefination/productDefination')
// const resolvers =require('./GraphQL/Resolvers/productsResolvers')
// const { ApolloServer, gql } = require('apollo-server');
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:false}))

app.use(cors()) 
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));


mongoose.connect(process.env.MONGDB_URL).then((res) => {
    console.log('Database connected successfully',)
}).catch((error) => {
    console.log("Error occured while connecting")
})
//import for Product
let fetch = require('./Fetch/fetchProducts')
let insert = require('./Create/insertProduct')
let update = require('./Update/updateProduct')
let remove = require('./Delete/deleteProduct')
//import for User
let fetchUser = require('./Fetch/fetchUser')
let insertUser = require('./Create/insertUser')
let updateUser = require('./Update/updateUser')
let removeUser = require('./Delete/deleteUser')
let fetchUserName = require('./Fetch/getUsername')
//importing from conditional files
let notCommon = require('./ConditionPractice/notCommon')
let combine = require('./ConditionPractice/union')
/////AUTHENTICATION////////////////////////
let authentication = require("./Authenticate/login")
//Routes for Product
app.use('/products',fetch)
app.use('/products',insert)
app.use('/products',update)
app.use('/products',remove)
//Routes for User
app.use('/users',fetchUser)
app.use('/users',insertUser)
app.use('/users',updateUser)
app.use('/users',removeUser)
//routes to get conditional Queries
app.use('/userItem',fetchUserName)
app.use('/notCommon', notCommon)
app.use('/all' , combine)
///////Authentication
app.use('/authentication',authentication)

app.listen(process.env.API_KEY,()=>{
    console.log("Server running on port no :- ",process.env.API_KEY)
})
