const express = require("express")

const app = express(); // creating server for us


const data = require("./bookDetails.json")

app.use(express.json())

const looger = (req,res,next)=>{
    console.log("Request from logger")
    req.name = "Pabitra Saikia"
    next();
}
app.use(looger)
app.get("/",(req,res)=>{

    console.log(req.method,"By",req.name)
    res.send(data)
}) 

app.get("/:author",(req,res)=>{

    const newData = data.filter((userData)=> userData.author=== req.params.author )
    res.send(newData)
}) 

app.post("/",(req,res)=>{
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

app.delete("/:author",(req,res)=>{
    const newData  = data.filter((item) => item.author != req.params.author)
    res.send(newData)
})

app.listen(2346,()=>{
    console.log("PORT ready at 2346")
})