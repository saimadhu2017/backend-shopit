const executeApi = require("../database/executeApi")
const { RES_ERR_PRODUCT_ADD_TO_CART } = require("../helpers/common")
const { onDone, onError } = require("../helpers/response")

// controllers onDone helpers methods..........................
const onAddingProductToCart = (rows, req, res) => {
    const { isCreated } = rows.find((row) => row)
    if (isCreated) {
        return onDone(rows, req, res)
    }
    return onError({ message: RES_ERR_PRODUCT_ADD_TO_CART }, res)
}

//controllers..................................................
exports.getUserData = (req, res) => {
    req.paramAuth.encry_password = undefined
    req.paramAuth.salt = undefined
    onDone(req.paramAuth, req, res)
}

exports.checkUserData = (req, res) => {
    onDone({ userCartQuantity: req?.paramAuth?.cart_quantity }, req, res)
}

exports.updateItemsQuantityInCart = (req, res) => {
    //Whatever quantity is passed in request body that will be updated in table and not added to current quantity in table of product
    const { product_id, quantity } = req.body
    const { id: user_id } = req.paramAuth
    const sql = `exec users.addToCart ${product_id},${user_id},${quantity}`
    executeApi(sql, req, res, onAddingProductToCart, onError)
}