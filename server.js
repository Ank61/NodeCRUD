const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const url = require('./url')

let app = express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:false}))

app.use(cors()) 

mongoose.connect(url).then((res) => {
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
//Routes for Product 
app.use('/fetch',fetch)
app.use('/insert',insert)
app.use('/update',update)
app.use('/delete',remove)
//Routes for User
app.use('/fetchUser',fetchUser)
app.use('/insertUser',insertUser)
app.use('/updateUser',updateUser)
app.use('/deleteUser',removeUser)
//routes to get conditional Queries
app.use('/fetchUserName',fetchUserName)
app.use('/notCommon', notCommon)
app.use('/all' , combine)



app.listen(8080,()=>{

    console.log("Server running on port no :- ",8080)

})