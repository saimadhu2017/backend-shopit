const { buildHasedPassword } = require("./password")
require('dotenv').config();

describe('buildHasedPassword', () => {
    it('should build new hased password and check whether it is correct one', () => {
        const inputPassword = 'password123'
        const { hashedPassword, salt } = buildHasedPassword(inputPassword)
        expect(hashedPassword).toEqual(buildHasedPassword(inputPassword, salt).hashedPassword)
    })
    it('should build new hased password and check whether it is wrong one', () => {
        const inputPassword = 'password123'
        const { hashedPassword, salt } = buildHasedPassword(inputPassword)
        expect(hashedPassword).not.toEqual(buildHasedPassword('sai', salt).hashedPassword)
    })
})