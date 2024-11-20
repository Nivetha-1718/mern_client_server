const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
;
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>console.log("DB Success"))
.catch(()=>console.log("DB Failed"))

const Fruit = mongoose.model("Fruit",{name:String},"fruit")


app.get("/fruitlist",function(req,res){
    Fruit.find().then(function(retdata){
        
        console.log(retdata)
        res.send(retdata)
    })
    
})

app.post("/addfruit",function(req,res){
    var newfruit = req.body.newfruit
    const newFruit = new Fruit(
        {
            name:newfruit
        }
    )
    newFruit.save().then(()=>console.log("Saved Successfully"))
    
})

app.post("/deletefruit",(req,res) => {
 
    const activityId = req.body.id;
 Fruit.findByIdAndDelete(activityId).then(()=>{
    res.status(200).send({message:"Fruit deleted successfully"});
    console.log("Deleted successfully");
 })
 .catch((err) => {
    console.error("Error deleting fruit:",err);
    res.status(500).send({message:"Failed to delete fruit",error:err});
 });
});

app.listen(5000,function(){
    console.log("Server Started...")
})