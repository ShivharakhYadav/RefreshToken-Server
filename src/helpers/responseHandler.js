const SuccessResponse = (res, data) => {
    const successReponse = {
        success: true,
        code: 200,
        data: data
    }
    return res.status(successReponse.code).json(successReponse);
}


const ErrorResponse = (res, code, message) => {
    const errResponse = {
        data: {},
        success: false,
        error: {
            code: code ? code : 500,
            messsage: message ? message : "Internal Server Error"
        }
    }

    return res.status(errResponse?.error?.code).json(errResponse)
}

const InternalError = (res) => {
    const internalErr = {
        data: {},
        success: false,
        error: {
            code: 500,
            messsage: "Internal Server Error"
        }
    }

    return res.status(internalErr?.error?.code).json(internalErr)
}
module.exports = { SuccessResponse, InternalError, ErrorResponse }