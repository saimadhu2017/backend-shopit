const Joi = require('joi');
const { VALID_FIRST_NAME, VALID_Last_NAME, VALID_MOBILE, VALID_COUNTRY, VALID_STRONG_PASSWORD, RES_ERR_PASSWORD_NOT_MATCH } = require('./common');

// rules..............................................................
const rules = {
    name: Joi.string().trim().required().ruleset.max(50).pattern(new RegExp(/^[a-zA-Z ]*$/)),
    mail: Joi.string().max(100).email().required(),
    phone: Joi.string().required().ruleset.length(10).pattern(new RegExp(/^\d{10}$/)),
    password: Joi.string().required().ruleset.pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
}

// schemas...............................................................
const userSchema = Joi.object({
    first_name: rules.name.message(VALID_FIRST_NAME),
    last_name: rules.name.message(VALID_Last_NAME),
    mail: rules.mail,
    phone: rules.phone.message(VALID_MOBILE),
    country: rules.name.message(VALID_COUNTRY),
    dob: Joi.date(),
    age: Joi.number().min(13),
    type: Joi.number().min(0),
    password: rules.password.message(VALID_STRONG_PASSWORD),
})

const userSignInSchema = Joi.object({
    mail: rules.mail,
    password: rules.password.message(RES_ERR_PASSWORD_NOT_MATCH),
})

// validators.................................................................
exports.validateCreateUser = (data) => {
    return userSchema.validate(data)
}

exports.validateSignInUser = (data) => {
    return userSignInSchema.validate(data)
}