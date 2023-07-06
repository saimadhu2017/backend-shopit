const { onDone } = require("../helpers/response")

//controllers..................................................
exports.getUserData = (req, res) => {
    req.paramAuth.encry_password = undefined
    req.paramAuth.salt = undefined
    onDone(req.paramAuth, req, res)
}