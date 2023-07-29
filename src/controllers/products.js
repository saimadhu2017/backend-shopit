const executeApi = require("../database/executeApi");
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