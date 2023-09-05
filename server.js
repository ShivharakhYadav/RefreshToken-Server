require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken");

app.use(cors())
app.use(express.json())


app.get("/login", async (req, res) => {
    try {
        console.log("bod", req.body)
        const { email, password } = req.body
        if (!email.trim()) return res.status(404).json({ success: false, data: {}, message: "Email Not Found" })

        if (!password.trim()) return res.status(404).json({ success: false, data: {}, message: "Password Not Found" })


        if (email == "test@gmail.com" && password == "1234") {
            const token = jwt.sign(req.body, process.env.KEY, { expiresIn: 60 })

            const refreshToken = jwt.sign(req.body, process.env.KEY, { expiresIn: 60 * 5 })

            return res.status(200).json({
                success: true,
                data: {
                    ...req.body,
                    accessToken: token,
                    refreshToken: refreshToken
                },
                message: ""
            })
        }
        else {
            res.status(401).json({ success: false, data: {}, message: "Unauthorized" })
        }
    } catch (error) {
        console.log("login err", error)
        res.status(500).json(error)
    }
})

app.post("/refresh", (req, res) => {
    try {

    } catch (error) {
        console.log("refresh err", error)
        res.status(500).json(error)
    }
})


app.get("/userlist", (req, res) => {
    try {

    } catch (error) {
        console.log("userlist err", error)
        res.status(500).json(error)
    }
})
app.listen(4100, console.log("Server Running on port 4100"))