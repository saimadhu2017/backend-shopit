require('dotenv').config();
const app = require('./app');
const http = require('http');

const backendPort = process.env.BACKEND_PORT

http.createServer(app).listen(backendPort, () => {
    console.log(`server is up and running at http://localhost:${backendPort}/`);
})