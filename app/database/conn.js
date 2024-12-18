const mongoose = require("mongoose");
const db = "mongodb+srv://Nitish:Nitish123@interviewbot.0luon.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(db).then(() => {
    console.log(`Database Connected successfully`);
}).catch((e) => {
    console.log(`No connection`);
})
