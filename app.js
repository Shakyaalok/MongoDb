const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { mongoConnect } = require('./config/db');







//routes
const product = require('./routes/products');
const user = require('./routes/user')






//middleware
app.use(express.json());
app.use('/user', user)
app.use('/', product)












mongoConnect(() => {
    app.listen(8000, () => {
        console.log('server is listening')
    })
})