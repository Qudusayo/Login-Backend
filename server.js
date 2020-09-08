require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const server = express();

mongoose
.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDb connected successfully'))
.catch(err => console.log(err))

const api = require('./api/api');
const login = require('./Routes/login');
const signup = require('./Routes/signup');
const verify = require('./Routes/verify');
const reset = require('./Routes/resetPin');

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
})

server.use(express.json());
server.use(express.urlencoded({ extended: false }))

server.use('/api', api);
server.use('/login', login);
server.use('/signup', signup);
server.use('/verify', verify);
server.use('/reset', reset);

const port = 5000 || process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));