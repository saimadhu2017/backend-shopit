const { Connection } = require('tedious');
const dbconfig = require('./dbConfig');
const { internalServErr, unavailable } = require('../helpers/httpCodes');

const connectDB = (fetchDBData, res) => {
    try {
        const connection = new Connection(dbconfig);
        connection.on('connect', (err) => {
            if (err) {
                return res.status(internalServErr.code).json({
                    status: internalServErr.status,
                    message: internalServErr.message,
                    err: internalServErr.message
                })
            }
            fetchDBData(connection)
        })
        connection.connect()
    } catch (error) {
        res.status(unavailable.code).json({
            status: unavailable.status,
            message: unavailable.message,
            err: unavailable.message
        })
    }
}

module.exports = connectDB