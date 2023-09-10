require('dotenv').config()
const express = require('express');
const User = require("../modal");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
const connectTOdb = require('./config/dbConfig')
const environmentConfig = require('./config/envorimnentConfig')
const authRouter = require("./Routes/authRoutes");


app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const startServer = async () => {
    await connectTOdb().then(() => {
        app.listen(environmentConfig.PORT, console.log(`Server Running on port ${environmentConfig.PORT}`))
    })
}

startServer()