// Modify google calendar using gcal api
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const user = require("./users");

// Token verification
const client = new OAuth2Client(process.env.CLIENT_ID);
const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return payload;
};

// Check if user exists
const checkUser = (payload) => {
    const userid = payload["sub"];
    return user
        .getUser(userid)
        .then((dbuser) => {
            if (dbuser) {
                return dbuser;
            } else {
                const userBody = {
                    _id: userid,
                    name: payload["name"],
                    email: payload["email"],
                };
                return user.postUser(userBody).then((result) => result);
            }
        })
        .catch((error) => console.error(error));
};

// Receiving ID token
router.post("/tokensignin", (request, response) => {
    response.set({
        "Access-Control-Allow-Origin": "http://localhost:3000",
    });
    verify(request.body.idtoken)
        .then((payload) => checkUser(payload))
        .then((result) => {
            response.json(result);
        })
        .catch(console.error);
});

module.exports = router;
