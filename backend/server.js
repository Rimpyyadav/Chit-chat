const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js')

const app = express();
connectDB();
dotenv.config();

app.use(express.json());
app.get("/",(req,res) => {
    res.send("API is running");
});

 app.use('/api/user, userRoutes')

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`server started on PORT ${PORT}`));