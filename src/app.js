const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const productsRoutes = require('./routes/products')
const storesRoutes = require('./routes/stores')

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
})

//Backend Project Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productsRoutes);
app.use('/stores', storesRoutes);


module.exports = app