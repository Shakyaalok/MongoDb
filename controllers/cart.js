const { getDb } = require('../config/db');
const mongodb = require('mongodb');



// create the cart but has to implement increase or decrease because only increase functionality is there or we can create the separeate api for the update the cart
const cartInsert = async(req, res) => {
    const db = getDb();
    let { prodId } = req.params;
    const userId = req.user._id
    try {
        const product = await db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) });
        if (!product) {
            return res.status(400).json({ message: 'Sorry, Product either deleted or no more exits' })
        }


        let isProductExistsInCart = await db.collection('carts').findOne({ "items.prodId": new mongodb.ObjectId(prodId), "items.userId": new mongodb.ObjectId(userId) });
        if (isProductExistsInCart) {
            let { _id } = isProductExistsInCart;
            let { prodId, quantity } = isProductExistsInCart.items;

            let cartUpdate = await db.collection('carts').updateOne({ _id: new mongodb.ObjectId(_id), "items.prodId": new mongodb.ObjectId(prodId), "items.userId": new mongodb.ObjectId(userId) }, { $set: { "items.quantity": (quantity + 1) } });
            return res.status(201).json({ cartUpdate: cartUpdate, message: 'cart has been updated' })

        } else {
            const items = {
                userId,
                prodId: product._id,
                quantity: 1
            }
            const cart = await db.collection('carts').insertOne({ items })
            res.status(200).json({ cart })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrong', error })
    }
}



//fetching the cart for the particular user
const fetchCart = async(req, res) => {

    const userId = req.user._id;
    const db = getDb();

    try {
        // find the ids of userId in carts
        const userCart = await db.collection('carts').find({ "items.userId": new mongodb.ObjectId(userId) }).toArray();


        // find the productIDs which the user has added.
        let prodIds = userCart.map((doc) => {
            let { _id } = doc;
            let { userId, ...rest } = doc.items;
            let AdditionalItems = { cartId: _id, ...rest }
            return AdditionalItems;
        })


        // now map the prodcut id to products table to show them nicely
        console.log(prodIds)
        let products = await Promise.all(prodIds.map((ID) => db.collection('products').findOne({ _id: ID.prodId })))
        let itemInCarts = products.map((items, index) => {
            console.log('items', items)
            let { userId, _id, ...rest } = items;
            let AdditionalItems = { quantity: prodIds[index].quantity, ...rest }
            return AdditionalItems;
        })

        res.status(200).json({ itemInCarts, message: 'Fetch successfully!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong", error })
    }

}

const deleteItemsInCart = async(req, res) => {
    const userId = req.user._id;
    const { prodId } = req.params;
    const db = getDb();
    console.log('userId', userId, 'prodId', prodId)
    try {

        //first find the cart using userId and prodId
        const cart = await db.collection('carts').findOne({ "items.userId": userId, "items.prodId": new mongodb.ObjectId(prodId) });
        if (!cart) {
            return res.status(400).json({ message: 'something went wrong' })
        }

        const { _id, ...rest } = cart;
        //after finding the cartId delete the that cart
        await db.collection('carts').deleteOne({ _id: _id });

        res.status(200).json({ message: 'Prodct has been deleted from cart' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong', error })
    }
}


// delete the items in cart


module.exports = { cartInsert, fetchCart, deleteItemsInCart }