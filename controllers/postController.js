const { userSchema, postSchema, chatSchema, mong } = require("../schemas.js");

const loadPostsController = (request, response) => {
    const { requestCount, limit } = request.query;
    const skip = (requestCount - 1) * limit;
    const postModel = mong.model("posts", postSchema);
    postModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip)
        .then((data) => {
            return response.status(200).send(data);
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        });
};

const uploadPostController = (request, response) => {
    const { body } = request;
    const title = body.title;
    const text = body.text;
    const uploaderId = body.uploaderId;
    const postModel = mong.model("posts", postSchema);
    const data = postModel({
        title: title,
        text: text,
        uploaderId: uploaderId
    });
    data.save()
        .then((res) => {
            return response.status(200).send(res);
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        })
};

module.exports = {
    loadPostsController,
    uploadPostController
}