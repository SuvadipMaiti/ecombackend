const Models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {

    Models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already exists"
            });
        } else {
            bcryptjs.genSalt(10, function(err, salt) {
                bcryptjs.hash(req.body.password, salt, function(err, hash) {
                    const newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }

                    Models.User.create(newUser).then(result => {
                        res.status(201).json({
                            message: "User created"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "something going wrong",
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });

}


function login(req, res) {
    Models.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credential"
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token) {
                        res.status(200).json({
                            message: "Authenticated",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credential"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}


module.exports = {
    signUp: signUp,
    login: login
}