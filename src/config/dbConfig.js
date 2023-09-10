const mongoose = require("mongoose");
const environmentConfig = require("./envorimnentConfig");

const connectTOdb = async () => {
    try {
        return await mongoose.connect(environmentConfig.URL).then(() => {
            console.log("Connected to Database");
            return true;
        }).catch((err) => {
            console.log("Failed to connect to Database");
            return false;
        })
    } catch (error) {
        return false
    }
}

module.exports = connectTOdb;