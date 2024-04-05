const asyncHandler = require("express-async-handler");
const sendMessage = asyncHandler(async (req,res) => {
    const { content,chatId} = req.body;

    if (!content || !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
})

module.exports = { sendMessage };