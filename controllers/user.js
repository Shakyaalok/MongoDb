const { getDb } = require('../config/db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'dffewfewfewfew78few7cf6ew876c7cwe6f8ewcbewbjfbewbf'
const mongodb = require('mongodb')



const createUser = (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'provide all the fields' })
    }

    bcrypt.hash(password, saltRounds, function(err, haspassword) {
        const user = new User(username, email, haspassword);
        user.save()
            .then(result => {
                console.log('created user');
                console.log(user)
                res.status(201).json(user)
            })
            .then(err => {
                console.log(err)
            })
    })
}



//login
const login = async(req, res) => {
    const db = getDb();

    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email: email });


    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'No user found with this match' });
    }



    const token = jwt.sign({ _id: user._id }, process.env.secretKey);
    res.status(200).json({ token: token })
}



module.exports = { createUser, login };