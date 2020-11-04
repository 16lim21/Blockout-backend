// Using dotenv for development environment variables
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Connect to mongodb database
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) =>
        console.log(`Error connecting to MongoDB: ${error.message}`)
    );

// Setup express app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);

app.use(bodyParser.json()); // Parse applicaiton/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
); //Parse application/x-www-form-urlencoded from tokenid

// Define application routing
const users = require("./routers/users");
app.use("/api", users.router);

const blockout = require("./routers/blockout");
app.use("/api", blockout);

// Listen on specified port for express app
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});

module.exports = app;
