const executeApi = require('../database/executeApi')
const { onDone, onError } = require('../helpers/response')
const { validateCreateUser, validateSignInUser } = require('../helpers/validators')
const { buildHasedPassword } = require('../helpers/password')
const { RES_ERR_MAIL_ALREADY_EXISTS, RES_ERR_MAIL_NOT_EXISTS, RES_ERR_PASSWORD_NOT_MATCH, RES_SIGNOUT_MESSAGE, RES_ERR_INVALID_USER_ID } = require('../helpers/common')
const { handleNull } = require('../helpers/helpers')
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const { unAuth, forbidden } = require('../helpers/httpCodes')

// controllers onDone helpers methods.........................................
const onCreatingUser = (rows, req, res) => {
    const { isCreated } = rows.find((row) => row)
    if (isCreated) {
        return onDone(rows, req, res)
    }
    return onError({ message: RES_ERR_MAIL_ALREADY_EXISTS }, res)
}

const onMailFound = (rows, req, res) => {
    const { encry_password, salt, isMailPresent, id: userId } = rows.find((row) => row)
    if (isMailPresent) {
        const { password, mail } = req.query
        const { hashedPassword } = buildHasedPassword(password, salt)
        if (hashedPassword === encry_password) {
            const jwtToken = jwt.sign({ mail }, process.env.JWT_TOKEN_SECRET)
            res.cookie(process.env.JWT_SESSION, jwtToken, { maxAge: 60000 })
            const finalData = {
                jwtToken,
                mail,
                userId
            }
            return onDone(finalData, req, res)
        }
        return onError({ message: RES_ERR_PASSWORD_NOT_MATCH }, res)
    }
    return onError({ message: RES_ERR_MAIL_NOT_EXISTS }, res)
}

// controllers....................................................
exports.signUp = (req, res) => {
    const userValidData = validateCreateUser(req.body)
    if (userValidData?.error) {
        return onError(userValidData.error, res)
    }
    const { hashedPassword: encry_password, salt } = buildHasedPassword(req.body.password)
    const { first_name, last_name, mail, phone, country, dob, age, type } = req.body

    const sql = `exec users.createUser '${first_name}','${last_name}','${mail}','${phone}','${country}','${encry_password}','${salt}',
    ${dob ? `'${dob}'` : null},
    ${handleNull(age)},
    ${handleNull(type)}`

    executeApi(sql, req, res, onCreatingUser, onError)
}

exports.signIn = (req, res) => {
    const userValidData = validateSignInUser(req.query)
    if (userValidData?.error) {
        return onError(userValidData.error, res)
    }
    const sql = `select * from users.checkMailPresent('${req.query.mail}')`
    executeApi(sql, req, res, onMailFound, onError)
}

exports.signOut = (req, res) => {
    res.clearCookie(process.env.JWT_SESSION);
    onDone({ message: RES_SIGNOUT_MESSAGE }, req, res)
}

//MiddleWares...........................................................
exports.isSignedIn = expressjwt({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: [process.env.EXPRESS_JWT_ALGO]
})

exports.checkValidUser = (req, res, next, id) => {
    if (isNaN(id)) {
        return onError({ message: RES_ERR_INVALID_USER_ID }, res)
    }
    const onDoneValidUser = (rows, req) => {
        req.paramAuth = rows.find((row) => row);
        next()
    }
    const sql = `SELECT * from users.getUser((${id}))`;
    executeApi(sql, req, res, onDoneValidUser, onError)
}

exports.isAuthenticated = (req, res, next) => {
    const sameMail = req.paramAuth?.mail && req.auth?.mail && (req.paramAuth.mail === req.auth.mail);
    if (!sameMail) {
        return (
            res.status(unAuth.code).json({
                status: unAuth.status,
                message: unAuth.message,
                err: unAuth.message
            })
        )
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.paramAuth?.type === 1) {
        next();
        return;
    }
    return (
        res.status(forbidden.code).json({
            status: forbidden.status,
            message: forbidden.message,
            err: forbidden.message
        })
    );
}