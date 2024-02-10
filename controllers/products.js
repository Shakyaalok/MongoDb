const Product = require('../models/product');
const mongodb = require('mongodb');
const User = require('../models/user')



//add product--> db.collection('collection-name').insertOne({}) and insertMany({})
const addProduct = async(req, res) => {

    const id = req.user._id;
    try {

        const user = await User.findOne({ _id: id });
        if (user.isAdmin !== true) {
            return res.status(401).json({ message: 'You are not Authorized' })
        }


        const { title, price, description, imageUrl } = req.body;
        const product = await Product.create({ title: title, price: price, description: description, imageUrl: imageUrl, adminId: id });
        res.status(201).json({ product: product, meesage: 'Successfully created product' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error })
    }
}



//get one product-->  db.collection('collection-name').findOne({}) and find({})
const getoneProduct = async(req, res) => {
    // very important is that in mongobd we can not fetch by as usual we do becuase it a object with constructor so
    // we have to import mongodn and use object of it with new keyword
    const id = req.user._id
    const { prodId } = req.params

    try {
        //checking if the login user is admin or not
        const user = await User.findOne({ _id: id });
        if (user.isAdmin !== true) {
            return res.status(401).json({ message: 'You are not authorized' });
        }

        const product = await Product.findOne({ _id: new mongodb.ObjectId(prodId) });
        if (!product) {
            return res.status(400).json({ message: 'no product found' });
        }

        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: 'something went wrong', err });

    }
}



//get all product
const getallProducts = async(req, res) => {
    const id = req.user._id;

    try {

        const user = await User.findOne({ _id: id });

        //checking if the login user is admin or not
        if (user.isAdmin !== true) {
            return res.status(401).json({ message: 'You are not authorized' })
        }
        const products = await Product.find();

        if (!products) {
            return res.status(404).json({ message: 'no products found' });
        }

        res.status(200).json(products)

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'something went wrong', err });

    }
}


//delete one product-->db.collection('collection-name').deleteOne({}) and deleteMany({})
const removeOne = async(req, res) => {

    const id = req.user._id;
    const { deleteId } = req.params

    try {

        //checking if the login user is admin or not
        const user = await User.findOne({ _id: id });
        if (user.isAdmin !== true) {
            return res.status(401).json({ message: 'You are not authorized' });
        }


        const product = await Product.deleteOne({ _id: new mongodb.ObjectId(deleteId) });
        if (!product) {
            return res.status(404).json({ message: 'no products found' });
        }

        res.status(200).json({ message: 'Product has been deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'something went wrong', err });

    }
}


//update--> db.collection('collection-name').updateOne({ key: value }, { $set: { newKey: newValue }}) and updateMany({ key: value }, { $set: { newKey: newValue } }) and replaceOne({ key: value }, { $set: { newKey: newValue } })

const updtOne = async(req, res) => {

    const id = req.user._id;
    const { prodId } = req.params;
    console.log(prodId)


    try {

        //checking if the login user is admin or not
        const user = await User.findOne({ _id: id });
        if (user.isAdmin !== true) {
            return res.status(401).json({ message: 'You are not authorized' });
        };

        const { title, price, description, imageUrl } = req.body;
        const updateDetails = {
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl
        }

        const product = await Product.updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: updateDetails })
        if (!product) {
            return res.status(404).json({ message: 'No product find to update' })
        }

        res.status(201).json({ product })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}


module.exports = {
    addProduct,
    getoneProduct,
    getallProducts,
    removeOne,
    updtOne
}