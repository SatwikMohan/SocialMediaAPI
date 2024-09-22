module.exports = {
    chatMiddleware:function(request, response, next) {
        const { body } = request;
        if (!body) {
            return response.status(400).send({ msg: "Data body is required" });
        } else {
            const chat = body.chat;
            if (!chat) {
                return response.status(400).send({ msg: "chat field is required" });
            }
            else if (!(typeof chat == "string") || (chat === "")) {
                return response.status(400).send({ msg: "chat should be a non-empty string" });
            }
        }
        next();
    }
}