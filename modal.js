const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    refreshToken: String,
    email: String,
    password: String
})


const User = model("User", UserSchema)
module.exports = User;