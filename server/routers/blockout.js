// Modify google calendar using gcal api
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Receiving ID token
router.post("/tokensignin", (request, response) => {
    console.log(request.body);
    response.set({
        "Access-Control-Allow-Origin": "http://localhost:3000",
    });
    response.send("received");
});

module.exports = router;
