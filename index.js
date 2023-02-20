const express = require("express");
const connection = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/posts.routes")
const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Linkedin Users and Posts App")
})


app.use("/users",userRouter)
app.use("/posts" ,postRouter)

app.listen(process.env.port,async()=>{
try{
await connection
console.log("Connected to db")

}catch(err){
 console.log("Can't connect")   
console.log(err)

}
console.log(`server is running at port ${process.env.port}`)
})