const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db')


const auth = async(req, res, next) => {
    const db = getDb();
    const token = req.header('Authorization');

    console.log('token=>', token)
    if (!token) return res.status(400).json({ message: 'No token provided' });
    const decodeToken = jwt.verify(token, process.env.secretKey);


    await db.collection('users').findOne({ _id: decodeToken._id })
        .then(user => {
            req.user = user;
            next();
        })

}


// error i was facing and spending long time because i was passing like bearer, Jwt bearer token , and something luke that but i have to inherit from the parent


module.exports = { auth };