const mongoose=require("mongoose");
const quizSchema=new mongoose.Schema({
    Gmail:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})
const quiz=new mongoose.model("testquestions",quizSchema);