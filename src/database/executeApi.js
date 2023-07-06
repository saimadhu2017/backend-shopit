const { Request } = require('tedious');
const connectDB = require('./connectDatabase');

const executeApi = (sql, req, res, onDone, onError) => {

    const fetchDBData = (connection) => {
        const formatedRows = [];
        let checkErrorInDBFetch = false;
        const request = new Request(sql, (err) => {
            if (err) {
                checkErrorInDBFetch = true;
                onError(err, res);
            }
            connection.close();
        })

        request.on('row', (columns) => {
            const item = {}
            columns && columns.forEach((column) => {
                item[column.metadata.colName] = column.value;
            })
            formatedRows.push(item)
        })

        request.on('requestCompleted', () => {
            !checkErrorInDBFetch && onDone(formatedRows, req, res)
        })

        connection && connection.execSql(request)
    }

    connectDB(fetchDBData, res)
}

module.exports = executeApi