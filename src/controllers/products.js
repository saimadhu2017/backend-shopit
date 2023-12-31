const executeApi = require("../database/executeApi");
const { VALID_PRODUCT_NAME } = require("../helpers/common");
const { onDone, onError } = require("../helpers/response");

// controllers onDone helpers methods.........................................
const onProductsFind = (rows, req, res) => {
    rows = rows?.map((row) => {
        const { list_price, sale_price } = row
        if (list_price != null && sale_price !== null) {
            return ({
                ...row,
                final_price: sale_price.toLocaleString('en-IN'),
                striked_price: list_price.toLocaleString('en-IN')
            })
        }
        return ({
            ...row,
            final_price: list_price.toLocaleString('en-IN')
        })
    })
    return onDone(rows, req, res)
}


// controllers....................................................
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
    const { id: user_id } = req.paramAuth
    const sql = `select * from products.getProductsByName('${name}', ${user_id})`
    executeApi(sql, req, res, onProductsFind, onError)
}