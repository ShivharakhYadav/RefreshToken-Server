const jwt = require('jsonwebtoken');

const generateAccessToken = (body) => {
    try {
        const token = jwt.sign(body, process.env.KEY, { expiresIn: 60 })
        return token
    } catch (error) {
        return null;
    }
}

const generateRefreshToken = (body) => {
    try {
        const refreshToken = jwt.sign(body, process.env.KEY, { expiresIn: 60 * 5 })
        return refreshToken
    } catch (error) {
        return null;
    }
}


const verifyHeaderToken = async () => {
    try {
        const { authorization } = req.headers;

        if (!authorization) return new ErrorResponse(res, 404, "Token not Found");

        const scheme = authorization.split(' ')[0];

        if (scheme !== 'Bearer') return new ErrorResponse(res, 401, "Invalid Token..!");

        const token = authorization.split(' ')[1];
        jwt.verify(token, environmentConfig.JWT_SECRET, async (err, payload) => {
            if (err?.message == "jwt expired") {
                return new ErrorResponse(res, 401, "Token Expired");
            }

            if (err && err?.message != "jwt expired") {
                return new ErrorResponse(res, 401, "Invalid Token");
            }

            if (payload) {
                let body = {
                    _id: payload?._id,
                    email: payload?.email
                }
                req.body = body;
                next()
            }
            else {
                return new InternalError(res);
            }
        });

    } catch (error) {
        return new ErrorResponse(res, 401, "Unauthorized..!")
    }
}
module.exports = { generateAccessToken, generateRefreshToken }