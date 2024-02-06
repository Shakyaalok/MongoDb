const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
const mongodb = require('mongodb')


const auth = async(req, res, next) => {
    const db = getDb();
    const token = req.header('Authorization');

    console.log('token=>', token)
    if (!token) return res.status(400).json({ message: 'No token provided' });
    const decodeToken = jwt.verify(token, process.env.secretKey);


    db.collection('users').findOne({ _id: new mongodb.ObjectId(decodeToken._id) })
        .then(user => {
            // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7', user._id)
            req.user = user;
            next();
        })

}


// error i was facing and spending long time because i was passing like bearer, Jwt bearer token , and something luke that but i have to inherit from the parent


module.exports = { auth };