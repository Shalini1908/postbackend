const express = require("express");
const {PostModel} = require("../model/posts.model");
const jwt = require("jsonwebtoken")
const postRouter = express.Router();

postRouter.get("/",(req,res)=>{
const token = req.headers.authorization
let query = {}

if(req.query.device){
    query.device = req.query.device
}

const Id = req.body.userId
try{
if(token){
    jwt.verify(token,"masai",async(err,decoded)=>{
  const Id = decoded.userId
  const posts = await PostModel.find({...query,userId:Id})
  res.send(posts)

    })
}else{
res.send("Please Login")
}

}catch(err){
    res.send("Please Login")
    console.log(err)

}
})


postRouter.post("/",async(req,res)=>{
const posts = req.body
console.log(posts)
try{
let post = new PostModel(posts)
await post.save()
res.send({"message":"Post Created"})

}catch{err}{
res.send({"message":"Something went wrong"})
console.log(err)
}
})


postRouter.patch("/update/:id",async(req,res)=>{
const payload = req.body
console.log(payload)
const id = req.params.id
const post = await PostModel.findOne({"_id":id})
const postId = post.userId
const makingId = req.body.userId
try{
if(postId!==makingId){
    res.send({"message":"You are not Authorised"})
}else{
    await PostModel.findByIdAndUpdate({"_id":id},payload)
    res.send("Updated Successfully")
}

} catch(err){
res.send({"message":"Something went wrong can't update"})
console.log(err)
}   
})


postRouter.delete("/delete/:id",async(req,res)=>{
const id = req.params.id
const post = await PostModel.findOne({"_id":id})
const postId = post.userId
const makingId = req.body.userId
try{
if(postId!==makingId){
    res.send({"message":"You are not Authorised"})
}else{
    await PostModel.findByIdAndDelete({"_id":id})
    res.send("Deleted Successfully")
}

} catch(err){
res.send({"message":"Something went wrong can't delete"})
console.log(err)
}  
})


module.exports={
    postRouter
}