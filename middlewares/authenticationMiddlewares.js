module.exports = {
    registerMiddleware:function(request, response, next) {
        const { body } = request;
        if (!body) {
            return response.status(400).send({ msg: "Data body is required" });
        } else {
            const userName = body.userName;
            const email = body.email;
            const password = body.password;
            if (!userName) {
                return response.status(400).send({ msg: "userName is a required field" });
            }
            else if (!email) {
                return response.status(400).send({ msg: "email is a required field" });
            }
            else if (!password) {
                return response.status(400).send({ msg: "password is a required field" });
            }
            else if (!(typeof userName == "string") || (userName === "")) {
                return response.status(400).send({ msg: "userName should be a non-empty string" });
            }
            else if (!(typeof email == "string") || (email === "")) {
                return response.status(400).send({ msg: "email should be a non-empty string" });
            }
            else if (!(typeof password == "string") || (password.length < 8)) {
                return response.status(400).send({ msg: "password should be atleast 8 characters long" });
            }
        }
        next();
    },
    logInMiddleware:function(request, response, next) {
        const { body } = request;
        if (!body) {
            return response.status(400).send({ msg: "Data body is required" });
        } else {
            const email = body.email;
            const password = body.password;
            if (!email) {
                return response.status(400).send({ msg: "email is a required field" });
            }
            else if (!password) {
                return response.status(400).send({ msg: "password is a required field" });
            }
            else if (!(typeof email == "string") || (email === "")) {
                return response.status(400).send({ msg: "email should be a non-empty string" });
            }
            else if (!(typeof password == "string") || (password === "")) {
                return response.status(400).send({ msg: "password should be a non-empty string" });
            }
        }
        next();
    }
}