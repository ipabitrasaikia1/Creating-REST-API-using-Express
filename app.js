const express = require("express")
const mongoose = require("mongoose")

const app = express(); // creating server for us

const data = require("./bookDetails.json")

app.use(express.json())

const looger = (req,res,next)=>{
    console.log(req.method,"Request from logger")
    req.name = "Pabitra Saikia"
    next();
    
}

app.get("/",looger,(req,res)=>{

    console.log(req.method,"By",req.name)
    res.send(data)
}) 

app.get("/:author",looger,(req,res)=>{

    const newData = data.filter((userData)=> userData.author=== req.params.author )
    res.send(newData)
    console.log({"API request by" : req.name},"Books", newData)
}) 

app.post("/",looger,(req,res)=>{
    const newData = [...data,req.body]
    res.send(newData)
}) 

app.patch("/:author",(req,res)=>{

    console.log(req.params.author)
    const newData = data.map((item)=>{
        if(req.params.author === item.author){
            console.log(req.body)

            return req.body
        }

        return item
    })

    res.send(newData)
}) 

app.delete("/:author",looger,(req,res)=>{
    const newData  = data.filter((item) => item.author != req.params.author)
    res.send(newData)
})

app.listen(2346,()=>{
    console.log("PORT ready at 2346")
})