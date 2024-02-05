const express = require('express');
const app = express();
const { mongoConnect } = require('./config/db');







//routes
const product = require('./routes/products');






//middleware
app.use(express.json());
app.use('/', product)












mongoConnect(() => {
    app.listen(8000, () => {
        console.log('server is listening')
    })
})