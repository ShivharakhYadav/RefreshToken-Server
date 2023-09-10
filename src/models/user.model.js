const { Schema, model } = require("mongoose")

const userModel = new Schema({
    email: {
        require: true,
        type: Schema.Types.String
    },
    password: {
        require: true,
        type: Schema.Types.String
    },
    refreshToken: Schema.Types.String
})

module.exports = model("Users", userModel);