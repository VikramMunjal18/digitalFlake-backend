const express = require("express");
const app = express();
require("./conn/conn");

const auth = require("./routes/auth")
app.use(express.json());

app.get("/",(req,res)=> {
    res.send("Hello World!");
 });				// run server and check in chrome localhost:5002

app.use("/api/v1",auth);

app.listen(5005,()=>{
    console.log("Server Started at PORT 5002");
});
