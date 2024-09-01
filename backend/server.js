const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoute.js");
const {notFound,errorHandler} = require('./middleware/errorMiddleware.js');

const app = express();
connectDB();
dotenv.config();

app.use(express.json());

 app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

 app.use(notFound)
 app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(3000, console.log(`server started on PORT ${PORT}`));