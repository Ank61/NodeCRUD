const express = require('express')
const jwt = require('jsonwebtoken')
const { response } = require('../Fetch/fetchProducts')
const authModel = require('../Modal/authenticate')
const app = express()
const bcrypt=require('bcryptjs')

app.post("/login" ,async(request,response)=>{

    try{
        const {email ,password} = request.body;
        if(!(email&&password)){
            response.status(400).send("All inputs are required")
        }
        const user = await authModel.findOne({email})

        if(user && (bcrypt.compare(password , user.password))){
           
            const token = jwt.sign(
                {email : user.email},
                "123",
                { expiresIn: "2h"}
            )
            console.log(token)
            const Saved = new authModel({
                email : email,
                password :password,
                token :token
            })
            await Saved.save()
            user.token = token
            response.status(200).send(token)
        }
        else{
        response.send("Invalid Credentials").status(400)
    }
}
    catch(err){
        console.log(err);
    }
})

module.exports = app;