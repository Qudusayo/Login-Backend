const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../Model/userSchema");

router.post("/", (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    User.findOne({ email: email }).then((result) => {
        if (result) {
            bcrypt
                .compare(password, result.password)
                .then((response) => {
                    if (response) {
                        res.json({
                            status: 200,
                            message: "Login successful",
                        });
                    } else {
                        res.json({
                            status: 403,
                            message: "invalid email or password",
                            errorMsg: true
                        });
                    }
                })
                .catch((err) => {
                    res.json({
                        status: 401,
                        message: "Login error",
                        errorMsg: err,
                    });
                });
        } else {
            res.json({
                status: 401,
                message: "User not registered",
                errorMsg: true
            });
        }
    }).catch(err => {
        res.json({
            status: 401,
            message: 'Login error',
            errorMsg: err
        })
    })
});
module.exports = router;
