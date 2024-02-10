const User = require('../models/user');
const Product = require('../models/product')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'dffewfewfewfew78few7cf6ew876c7cwe6f8ewcbewbjfbewbf'
const mongodb = require('mongodb')



const createUser = (req, res) => {

    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'provide all the fields' })
    }

    bcrypt.hash(password, saltRounds, async function(err, haspassword) {
        const user = await User.create({ username: username, email: email, password: haspassword, isAdmin: isAdmin });
        res.status(201).json({ user: user, message: 'user created Successfully!' })
    })
}



//login
const login = async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });


    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'No user found with this match' });
    }



    const token = jwt.sign({ _id: user._id }, process.env.secretKey);
    res.status(200).json({ token: token })
}


//get all product
const getallProducts = async(req, res) => {


    try {
        const allProducts = await Product.find().select('-adminId');
        console.log(allProducts)

        if (!allProducts) {
            return res.status(404).json({ message: 'no products found' });
        }

        res.status(200).json({ allProducts })

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'something went wrong', err });

    }


}




// placed order
const placedOrder = async(req, res) => {
    /*
    const userId = req.user._id;
    const db = getDb();

    try {
        const products = await db.collection('carts').find({ "items.userId": userId }).toArray();
        const idsAndQuantity = products.map((itm) => {
            const obj = {
                prodIds: itm.items.prodId,
                quantity: itm.items.quantity,
            }
            return obj;
        })

        let price = 0;

        await Promise.all(idsAndQuantity.map(async(itm, index) => {
            let productsDetails = await db.collection('products').findOne({ _id: itm.prodIds });
            price = price + productsDetails.price * itm.quantity;
            return;
        }))
        res.status(200).json({ message: `Your order has been placed of total amount Rs ${price}` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrong', error })
    }
    */
}




module.exports = { createUser, login, getallProducts, placedOrder };