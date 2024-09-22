module.exports = {
    postsMiddleware:function(request, response, next) {
        const { body } = request;
        if (!body) {
            return response.status(400).send({ msg: "Data body is required" });
        } else {
            const title = body.title;
            const text = body.text;
            const uploaderId = body.uploaderId;
            if (!title) {
                return response.status(400).send({ msg: "title is a required field" });
            }
            else if (!text) {
                return response.status(400).send({ msg: "text is a required field" });
            }
            else if (!uploaderId) {
                return response.status(400).send({ msg: "uploaderId is a required field" });
            }
            else if (!(typeof title == "string") || (title === "")) {
                return response.status(400).send({ msg: "title should be a non-empty string" });
            }
            else if (!(typeof text == "string") || (text === "")) {
                return response.status(400).send({ msg: "text should be a non-empty string" });
            }
            else if (!(typeof uploaderId == "string") || (uploaderId === "")) {
                return response.status(400).send({ msg: "uploaderId should be a non-empty string" });
            }
        }
        next();
    }
}