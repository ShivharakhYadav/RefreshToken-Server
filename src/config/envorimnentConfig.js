require("dotenv").config();

const environmentConfig = Object.freeze({
    PORT: process.env.PORT ? process.env.PORT : 3002,
    URL: process.env.URL ? process.env.URL : "",
    KEY: process.env.KEY ? process.env.KEY : "REFRESH_TOKEN_TESTING_PROJECT"
})

module.exports = environmentConfig 
