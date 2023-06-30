const jwt = require("jsonwebtoken");
const User = require("../config/models/user.js");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt")
const crypto = require('crypto');
const { log } = require("console");
const keysecret = process.env.JWT_TOKEN


const registerUser = async (req, res) => {
    
    // console.log(name, email, username, password, cfpassword );
    const { name, email, username, password, cfpassword } = req.body;

    if (!name || !email || !password || !username || !cfpassword) {
        res.status(422).json({ error: "Plz Enter all Field Provided" })
    }

    try {
        const userExist = await User.findOne({ email: email })
        const isUsername = await User.findOne({ username: username })

        if (userExist || isUsername) {
            res.status(422).json({ error: "User already Exist" });
        } else if (password != cfpassword) {
            res.status(422).json({ error: "Password not matching" });
        }
        else {
            const user = new User({ name, email, username, password, cfpassword });
            await user.save();

            res.status(200).json({ message: "User Registered Succesfully 😊!" })
        }

    } catch (error) {
        console.log(error);
    }

}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(422).json({ message: "Plz Enter all filed" });
        }
        const userLogin = await User.findOne({ username: username });

        if (!userLogin) {
            res.status(404).json({ message: "Invalid Username" });
            return;
        }
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(422).json({ message: "Invalid Password" });
            } else {
                const token = await userLogin.generateAuthToken();
                log(token)
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 50000000),
                    sameSite: "None",
                    secure: true,
                    httpOnly: true,
                });
                res.status(200).json({ message: "User Login Succesfully 😃!", userLogin, token });
            }
        } else {
            res.status(422).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(422).json({ message: "Invalid Credentials" });
        
    }
}

const logOut = async (req, res) => {
    try {
    
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("jwt", { path: "/" });

        req.rootUser.save();

        res.status(200).json({ message: "Logout " })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}


// const islogin = (req, res) => {
//     console.log(req.rootUser);
//     res.status(200).json({ msg: "User is logged in", user: req.rootUser, });

// }

module.exports = {
    registerUser,
    loginUser,
    logOut,
};


