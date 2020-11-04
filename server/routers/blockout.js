// Modify google calendar using gcal api
const express = require("express");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();

// Token verification
const client = new OAuth2Client(process.env.CLIENT_ID);
const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    return payload;
};

// Receiving ID token
router.post("/tokensignin", (request, response) => {
    response
        .set({
            "Access-Control-Allow-Origin": "http://localhost:3000",
        })
        .send("received");
    verify(request.body.idtoken)
        .then((payload) => console.log(payload))
        .catch(console.error);
});

module.exports = router;
