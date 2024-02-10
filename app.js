const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');







//routes
const product = require('./routes/products');
const user = require('./routes/user');
const cart = require('./routes/cart');







//middleware
app.use(express.json());
app.use('/user', user);
app.use('/', product);
app.use('/cart', cart)










mongoose.connect('mongodb+srv://project7678:Strong123@learnmongo.fkoflqw.mongodb.net/shop')
    .then(result => {
        app.listen(8000, () => {
            console.log(`listening at the port of ${8000}`)
        })
    })
    .catch(err => {
        console.log(err)
    })