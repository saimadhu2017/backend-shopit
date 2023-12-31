const common = require("./common")
const testCommon = {
    SUCCESS_STATUS: 'success',
    FAIL_STATUS: 'fail',
    RES_ERR_MAIL_ALREADY_EXISTS: 'Sorry your account is already created please signIn',
    RES_ERR_MAIL_NOT_EXISTS: 'Sorry your account not found please signUp',
    RES_ERR_PASSWORD_NOT_MATCH: 'Please enter correct password',
    RES_SIGNOUT_MESSAGE: 'Sucessfully logged out',
    RES_ERR_INVALID_USER_ID: 'Invalid user ID',
    VALID_FIRST_NAME: 'Enter correct first name',
    VALID_Last_NAME: 'Enter correct last name',
    VALID_MOBILE: 'Enter valid mobile number',
    VALID_COUNTRY: 'Enter valid country name',
    VALID_STRONG_PASSWORD: 'Please provide a strong password'
}
describe('common', () => {
    it('common vaule should match', () => {
        expect(common).toEqual(testCommon)
    })
})