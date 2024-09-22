const {userSchema, postSchema, chatSchema, mong} = require("../schemas.js")

const getChatController = (request, response) => {
    const { userEmail1, userEmail2 } = request.query;
    const comp = userEmail1.localeCompare(userEmail2);
    let email1 = "";
    let email2 = "";
    if (comp === -1) {
        email1 = userEmail1;
        email2 = userEmail2;
    }
    else if (comp === 1) {
        email1 = userEmail2;
        email2 = userEmail1;
    }
    else {
        email1 = userEmail1;
        email2 = userEmail2;
    }
    const chatModel = mong.model("chats", chatSchema);
    chatModel.find({
        userEmail1: email1,
        userEmail2: email2
    }).sort({ createdAt: -1 })
        .then((data) => {
            return response.status(200).send(data);
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        })
};

const sendChatController = (request, response) => {
    const { sender, receiver } = request.query;
    const { body } = request;
    const comp = sender.localeCompare(receiver);
    let email1 = "";
    let email2 = "";
    if (comp === -1) {
        email1 = sender;
        email2 = receiver;
    }
    else if (comp === 1) {
        email1 = receiver;
        email2 = sender;
    }
    else {
        email1 = sender;
        email2 = receiver;
    }
    const chatModel = mong.model("chats", chatSchema);
    const chat = body.chat;
    const data = new chatModel({
        chat: chat,
        userEmail1: email1,
        userEmail2: email2,
        sender:sender,
        receiver:receiver
    });
    data.save()
        .then((res) => {
            return response.status(200).send(data);
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        });
};

module.exports = {
    getChatController,
    sendChatController
}