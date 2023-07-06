const { validateCreateUser, validateSignInUser } = require("./validators")

const validUserData = {
    first_name: 'test',
    last_name: 'last test',
    mail: 'test@gmail.com',
    phone: '1234567899',
    country: 'india a',
    password: 'Test@123'
}

describe('validateCreateUser', () => {
    it('Should validate the required fields', () => {
        expect(validateCreateUser(validUserData).value).toEqual(validUserData)
    })
    it('Should validate the first name and last name properly', () => {
        const mockUserData = {
            ...validUserData,
            first_name: 'test1'
        }
        expect(validateCreateUser(mockUserData).error.message).toEqual('Enter correct first name')
        expect(validateCreateUser({ ...validUserData, last_name: '1sa' }).error.message).toEqual('Enter correct last name')
        expect(validateCreateUser({ ...validUserData, last_name: 'kk aka' }).error).toEqual(undefined)
        expect(validateCreateUser({ ...validUserData, first_name: 'aka1 2 as' }).error.message).toEqual('Enter correct first name')
    })
    it('Should validate email properly', () => {
        const mockUserData = {
            ...validUserData,
            mail: '@asas.in'
        }
        expect(validateCreateUser(mockUserData).error.message).toEqual('\"mail\" must be a valid email')
        expect(validateCreateUser({ ...validUserData, mail: 'as.asas@aaaaa.in' }).error).toEqual(undefined)
    })
    it('Should validate dob properly', () => {
        const mockUserData = {
            ...validUserData,
            dob: '12/29/2021'
        }
        expect(validateCreateUser(mockUserData).error).toEqual(undefined)
        expect(validateCreateUser({ ...mockUserData, dob: '13/10/2021' }).error.message).toEqual('"dob" must be a valid date')
        expect(validateCreateUser({ ...mockUserData, dob: '12-10-2021' }).error).toEqual(undefined)
        expect(validateCreateUser({ ...mockUserData, dob: '14-10-2021' }).error.message).toEqual('"dob" must be a valid date')
    })
})

describe('validateSignInUser', () => {
    it('Should validate the required fields', () => {
        const loginData = {
            mail: 'ma.as@asas.in',
            password: 'Test@123'
        }
        expect(validateSignInUser(loginData).value).toEqual(loginData)
        expect(validateSignInUser(loginData).error).toEqual(undefined)
    })
    it('Should validate the required fields', () => {
        const loginData = {
            mail: 'ma.as@asas.in',
            password: 'as'
        }
        expect(validateSignInUser(loginData).error.message).toEqual('Please provide a strong password')
    })
})