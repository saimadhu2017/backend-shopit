const executeApi = require("../database/executeApi");
const { VALID_PRODUCT_NAME } = require("../helpers/common");
const { onDone, onError } = require("../helpers/response");

exports.createCatgory = (req, res) => {
    const { name } = req.body
    const sql = `insert into products.categories(name) values(${name ? `'${name}'` : null})`;
    executeApi(sql, req, res, onDone, onError)
}

exports.createBrand = (req, res) => {
    const { name } = req.body
    const sql = `insert into products.brands(name) values(${name ? `'${name}'` : null})`;
    executeApi(sql, req, res, onDone, onError)
}

exports.createProduct = (req, res) => {
    const { name, in_store, retailer, category, brand, list_price, sale_price, description } = req.body
    const sql = `insert into products.items(name, in_store, retailer, category, brand, list_price, sale_price, description)
    values(${name ? `'${name}'` : null}, ${in_store}, ${retailer}, ${category}, ${brand}, ${list_price},${sale_price >= 0 ? sale_price : null}, ${description ? `'${description}'` : null})`;
    executeApi(sql, req, res, onDone, onError)
}

exports.getProductsByNameSearch = (req, res) => {
    const { name } = req.query;
    if (!name) {
        return onError({ message: VALID_PRODUCT_NAME }, res)
    }
    const sql = `select * from products.getProductsByName('${req.query.name}')`
    executeApi(sql, req, res, onDone, onError)
}