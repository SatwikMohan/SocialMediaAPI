const { Router } = require("express");
const { logInMiddleware, registerMiddleware } = require("./middlewares/authenticationMiddlewares.js");
const { postsMiddleware } = require("./middlewares/postMiddleware.js");
const { chatMiddleware } = require("./middlewares/chatMiddleware.js");
const { userSchema, postSchema, chatSchema, mong } = require("./schemas.js");
const { sendChatController, getChatController } = require("./controllers/chatController.js");
const { uploadPostController, loadPostsController } = require("./controllers/postController.js");
const { loginController, registerController, verifyController } = require("./controllers/authController.js");
const router = Router();
require('dotenv').config();


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.EMAIL_USER,
//       pass: process.env.PASS,
//       clientId: "75781317990-d5700u1d879sbjuc7rgghodb7pa509pk.apps.googleusercontent.com",
//       clientSecret: "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",
//       //refreshToken: secure_configuration.REFRESH_TOKEN
//     }
//   });

router.post('/registerUser', registerMiddleware, registerController);

router.post('/logInUser', logInMiddleware, loginController );

router.get('/verify/:token',verifyController);

router.get('/allUsers', (request, response) => {
    const userModel = mong.model("users", userSchema);
    userModel.find()
        .then((data) => {
            return response.status(200).send(data);
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        });
});

router.post('/uploadPost', postsMiddleware, uploadPostController);

router.get('/loadPosts', loadPostsController);

router.get('/getChats', getChatController);

router.post('/sendChat', chatMiddleware, sendChatController);

module.exports = router;