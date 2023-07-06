const { ok, badReq } = require('./httpCodes')

exports.onDone = (rows, req, res) => {
    res.status(ok.code).json({
        status: ok.status,
        message: ok.message,
        data: rows
    })
}

exports.onError = (err, res) => {
    res.status(badReq.code).json({
        status: badReq.status,
        message: badReq.message,
        err: err.message
    })
}