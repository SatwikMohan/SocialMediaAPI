const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userSchema, postSchema, chatSchema, mong } = require("../schemas.js");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sender = {
    email: process.env.EMAIL_USER,
    name: "SocialMedia_API"
}


function sendEmail(email, verificationLink) {
    transporter.sendMail({
        from:sender,
        to: email,
        subject: 'Social Media API Email Verification',
        text: "Click the following link to verify your email: " + verificationLink + "\nVerification valid for only one hour.",
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

const loginController = async (request, response) => {
    const { body } = request;
    const email = body.email;
    const password = body.password;
    let hashedPassword = await bcrypt.hash(password, 10);
    const userModel = mong.model("users", userSchema);
    userModel.findOne({
        email: email,
        password: password,
        verified: true
    })
        .then((data) => {
            if (data)
                return response.status(200).send(data);
            else
                return response.status(400).send({ msg: "Invalid Credentials or the user is not verified" });
        })
        .catch((err) => {
            return response.status(404).send({ msg: "Something went wrong" });
        });
};

const registerController = async (request, response) => {
    try {
        const { body } = request;
        const userName = body.userName;
        const email = body.email;
        const password = body.password;
        const userModel = mong.model("users", userSchema);
        //let hashedPassword = await bcrypt.hash(password,10);
        const data = new userModel({
            userName: userName,
            email: email,
            password: password,
            verified: false
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const verificationLink = `http://localhost:8000/verify/${token}`;
        sendEmail(email, verificationLink);
        const user = await data.save();
        response.status(200).send(user)
    } catch (err) {
        console.log(err);
        response.status(404).send({ msg: "something went wrong" });
    }

    //sendEmail("satwikg17@gmail.com","google");


};

const verifyController = (request, response) => {
    try {
        const { token } = request.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userModel = mong.model("users", userSchema);
        console.log(decoded.email);
        userModel.findOne({
            email: decoded.email,
        })
            .then((data) => {
                if (data) {
                    userModel.updateOne(
                        { email: decoded.email },
                        {
                            $set: {
                                verified: true
                            }
                        }
                    )
                        .then((res) => {
                            return response.status(200).send(res);
                        })
                        .catch((err) => {
                            return response.status(404).send({ msg: "Something went wrong" });
                        });
                } else {
                    return response.status(400).send({ msg: "User not found" });
                }
            })
            .catch((err) => {
                return response.status(404).send({ msg: "Something went wrong" });
            });
    } catch (err) {
        return response.status(404).send({ msg: "Token has expired" });
    }
};

module.exports = {
    loginController,
    registerController,
    verifyController
}

