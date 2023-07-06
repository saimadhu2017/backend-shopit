require('dotenv').config();

const dbconfig = {
    server: process.env.DB_SERVER,
    options: {
        port: Number(process.env.DB_SERVER_PORT),
        database: process.env.DB_NAME,
        trustServerCertificate: true
    },
    authentication: {
        type: process.env.DB_AUTH_TYPE,
        options: {
            userName: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD
        }
    }
}

module.exports = dbconfig;