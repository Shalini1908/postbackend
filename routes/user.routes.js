const express = require("express");
const {UserModel} = require("../model/user.model")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
// const authenticate = require("../middleware/authenticate.middleware")
const userRouter = express.Router();


userRouter.get("/",(req,res)=>{
res.send("user")

})

userRouter.post("/register",async(req,res)=>{
const {name,email,password,gender,age,city}= req.body

try{
    bcrypt.hash(password, 5, async(err, secure_password) =>{
        // Store hash in your password DB.
        if(err){
            res.send({"message":"Something went wrong"})
        }else{
            const post = new UserModel({name,email,password:secure_password,gender,age,city})
            await post.save()
            res.send({"message":"User Registered"})
        }
    });
}catch(err){
    res.send({"message":"Something went wrong"})

}

})


userRouter.post("/login",async(req,res)=>{
    const {email,password}= (req.body)
    const id = req.params.id
    
  try{
    const user = await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password, user[0].password, async(err, result) =>{
            if(result){
        let token = jwt.sign({userID: user[0]._id},"masai")
        res.send({"message":"Logged in","token":token})
            }else{
                res.send({"message":"Wrong Credentials"})
            }
            });
    }else{
        res.send({"message":"Wrong Credentials"})
    }


  }catch(err){
    res.send({"message":"Can't login"})
    console.log(err)
    
  }
    
    })





module.exports={
    userRouter
}