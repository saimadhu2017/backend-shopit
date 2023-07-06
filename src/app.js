const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
})

//Backend Project Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


module.exports = app