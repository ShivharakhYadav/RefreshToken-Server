const User = require("../models/user.model")
const { ErrorResponse, InternalError, SuccessResponse } = require('../helpers/responseHandler');
const { generateRefreshToken, generateAccessToken } = require("../helpers/helper")
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    try {
        console.log(req.cookie)
        const { email, password } = req.body;
        if (!email || !password) {
            return ErrorResponse(res, 404, "Credential Not Found");
        }

        const users = await User.findOne({ email: email });
        if (!users) {
            return ErrorResponse(res, 404, "User Not Found");

        } else {
            const passwordMatched = bcrypt.compareSync(password, users.password);
            if (!passwordMatched) {
                return ErrorResponse(res, 401, "Unauthorized");
            } else {
                let body = {
                    _id: users?._id,
                    email: users?.email
                }

                const accessToken = generateAccessToken(body)
                const refreshToken = generateRefreshToken(body)

                if (accessToken != null && refreshToken != null) {
                    body["accessToken"] = accessToken;
                    body["refreshToken"] = refreshToken;

                    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: true, });
                    return SuccessResponse(res, body)
                }
                else {
                    return InternalError(res);
                }
            }
        }
    } catch (error) {
        console.log("Login eerrr", error)
        return InternalError(res);
    }
}


const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await User.findOne({ email: email });
        if (users) {
            return ErrorResponse(res, 409, 'User already exist..!')
        } else {
            const hashPassword = await bcrypt.hashSync(password, 12);
            const newuser = await User.create({
                email,
                password: hashPassword,
            });

            if (!newuser) {
                return InternalError(res);
            } else {
                return SuccessResponse(res, {})
            }
        }
    } catch (error) {
        console.log("---register err", error)
        return InternalError(res)
    }
}

// const refreshToken = async () => {
//     try {
//         let body = req.body;
//         const accessToken = await generateAccessToken(body);
//         const refreshToken = await generateRefreshToken(body);

//         if (accessToken != null && refreshToken != null) {
//             body["accessToken"] = accessToken;
//             body["refreshToken"] = refreshToken;
//             return  SuccessResponse(res, body);
//         }
//         return  InternalError(res);
//     } catch (error) {
//         return  InternalError(res);
//     }
// }



// app.post("/login", async (req, res) => {


//     try {
//         console.log("bod", req.body)
//         const { email, password } = req.body
//         if (!email?.trim())
//             return res.status(404).json({ success: false, data: {}, message: "Email Not Found" })

//         if (!password?.trim())
//             return res.status(404).json({ success: false, data: {}, message: "Password Not Found" })


//         const users = await User.findOne({ email: email });
//         if (!users) {
//             return res.status(404).json({ success: false, data: {}, message: "User Not Found" })
//         } else {
//             const passwordMatched = bcrypt.compareSync(password, users.password);
//             if (!passwordMatched) {
//                 return res.status(401).json({ success: false, data: {}, message: "Unauthorized" })

//             } else {
//                 let body = {
//                     _id: users?._id,
//                     email: users?.email
//                 }

//                 const accessToken = generateAccessToken(body)
//                 const refreshToken = generateRefreshToken(body)

//                 if (accessToken != null && refreshToken != null) {
//                     body["accessToken"] = accessToken;
//                     body["refreshToken"] = refreshToken;

//                     const updated = await User.findOneAndUpdate({ email: req.email }, {
//                         $set: {
//                             refreshToken: refreshToken
//                         }
//                     })

//                     console.log("-->updated", updated)
//                     // res.cookie("refreshToken", refreshToken, { httpOnly: true });
//                     // return  SuccessResponse(res, body)
//                 }
//                 else {
//                     return  InternalError(res);
//                 }
//             }
//         }

//         // if (email == "test@gmail.com" && password == "1234") {
//         //     const token = generateAccessToken(req.body)

//         //     if (!token) return res.status(500).json({ success: false, data: {}, message: "Failed to Generate Access Token" })

//         //     const refreshToken = generateRefreshToken(req.body)

//         //     if (!refreshToken) return res.status(500).json({ success: false, data: {}, message: "Failed to Generate Refresh Token" })

//         //     if (token && refreshToken) {
//         //         let data = await User.create({
//         //             ...req.body,
//         //             refreshToken: refreshToken
//         //         })

//         //         data = { ...data._doc, accessToken: token }
//         //         console.log("---data", data);

//         //         res.cookie("refreshToken", refreshToken, { httpOnly: true });
//         //         return res.status(200).json({
//         //             success: true,
//         //             data: data,
//         //             message: ""
//         //         })
//         //     }
//         //     return res.status(500).json({ success: false, data: {}, message: "Try After Sometime" })
//         // }
//         // else {
//         //     return res.status(401).json({ success: false, data: {}, message: "Unauthorized" })
//         // }
//     } catch (error) {
//         console.log("login err", error)
//         return res.status(500).json({ success: false, data: {}, message: "Internal Server Error" })
//     }
// })

// app.post("/refresh", async (req, res) => {
//     try {
//         const { refreshToken } = req.body;

//         if (!refreshToken) return res.status(404).json({ success: false, data: {}, message: "Token not Found" })

//         const data = await User.findOne({ refreshToken: refreshToken });

//         if (data.email) {
//             if (refreshToken == refreshToken) {

//             }
//             const token = generateAccessToken();
//             const refreshToken = generateRefreshToken();
//             const updatedData = await User.findOneAndUpdate()
//             return res.status(200).json({ success: true, data: { accessToken: token, refreshToken: refreshToken }, message: "" })
//         }
//     } catch (error) {
//         console.log("refresh err", error)
//         res.status(500).json(error)
//     }
// })



module.exports = { register, login }