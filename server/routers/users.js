// Creating simple REST API following this tutorial https://rahmanfadhil.com/express-rest-api/
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();

// Get all users
router.get("/users", (req, res) => {
    User.find({}).then((user) => res.json(user));
});

// Get individual user
router.get("/users/:id", (request, response) => {
    getUser(request.params.id, response)
        .then((user) => {
            if (user) {
                response.json(user);
            } else {
                response
                    .status(404)
                    .send({ error: "user ID does not exist" })
                    .end();
            }
        })
        .catch((error) => response.send(error));
});

const getUser = (userid) => {
    return User.findById({ _id: userid });
};

// Post new user
router.post("/users", (request, response) => {
    const userBody = {
        _id: request.body.userid,
        name: request.body.name,
        email: request.body.email,
    };
    postUser(userBody)
        .then((result) => response.json(result))
        .catch((error) => response.send(error));
});

const postUser = (userBody) => {
    const user = new User(userBody);
    return user.save();
};

// Update user
router.patch("/users/:id", (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((newUser) => {
            res.json(newUser);
        })
        .catch((error) => res.send(error));
});

// Delete user
router.delete("/users/:id", (request, response) => {
    deleteUser(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => response.send(error));
});

const deleteUser = (userid) => {
    return User.deleteOne({ _id: userid });
};

module.exports = {
    router: router,
    getUser: getUser,
    postUser: postUser,
};
