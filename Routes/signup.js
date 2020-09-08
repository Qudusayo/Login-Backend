const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../Model/userSchema");

router.post("/", (req, res) => {
    User.findOne({ email: req.body.email.toLowerCase() }).then((result) => {
        if (result) {
            return res.json({
                status: 403,
                message: "Email already exist, try another email",
                errorMsg: true,
                ...req.body
            });
        } else {
            return register(req.body.email.toLowerCase(), req.body.password);
        }
    });
    function register(email, password) {
        bcrypt
            .hash(password, 9)
            .then((hash) => {
                const data = new User({
                    email: email,
                    password: hash,
                    verified: false
                });
                data.save()
                    .then(() => {
                        return res.json({
                            status: 200,
                            message: "Signed successful, Kindly login",
                        });
                    })
                    .catch((err) => {
                        return res.json({
                            status: 401,
                            message: "Registration error, Try again",
                            errorMsg: err,
                            ...req.body
                        });
                    });
            })
            .catch((err) => {
                return res.json({
                    status: 401,
                    message: "Registration hash error, Try again",
                    errorMsg: err,
                    ...req.body
                });
            });
    }
});

module.exports = router;
