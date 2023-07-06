const { handleNull } = require("./helpers")

describe('handleNull', () => {
    it('should return null when value is false', () => {
        expect(handleNull(null)).toEqual(null)
    })
    it('should return value when value is true', () => {
        expect(handleNull(1)).toEqual(1)
    })
})