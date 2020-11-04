const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

module.exports = mongoose.model("User", schema);
