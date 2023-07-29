const executeApi = require("../database/executeApi")
const { onError, onDone } = require("../helpers/response")
const { validateRetailers } = require("../helpers/validators")

exports.createRetailers = (req, res) => {
    const retailerValidData = validateRetailers(req.body)
    if (retailerValidData?.error) {
        return onError(retailerValidData?.error, res)
    }
    const { name, mail, phone, country, city, full_address } = req.body

    const sql = `insert into stores.retailers(name, mail, phone, country, city, full_address)
    values('${name}', '${mail}', '${phone}', '${country}', '${city}', '${full_address}')`

    executeApi(sql, req, res, onDone, onError)
}
