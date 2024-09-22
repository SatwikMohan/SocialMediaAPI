const mong = require("mongoose");

async function setUpConnection(){
    await mong.connect("mongodb+srv://SatwikMohan:Captain47.@cluster0.b8jy3oh.mongodb.net/SocialMedia")
    .then(()=>console.log("Connection Established"))
    .catch(()=>console.log("Connection Failure"));
}

setUpConnection();

const userSchema = mong.Schema({
    userName:String,
    email:String,
    password:String,
    verified:Boolean
});

const postSchema = mong.Schema(
    {
        title:String,
        text:String,
        uploaderId:String
    },
    {
        timestamps:true
    }
);

const chatSchema = mong.Schema(
    {
        chat:String,
        userEmail1:String,
        userEmail2:String,
        sender:String,
        receiver:String
    },
    {
        timestamps:true
    }
);

module.exports =  {
   userSchema,
   postSchema,
   chatSchema,
   mong
};