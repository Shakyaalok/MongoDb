const mongobd = require('mongodb');
const MongoClient = mongobd.MongoClient;

let _db; // after-1

const mongoConnect = callback => {
    MongoClient.connect(
            'mongodb+srv://project7678:Strong123@learnmongo.fkoflqw.mongodb.net/shop'
        )
        .then(client => {
            console.log('connected');
            _db = client.db(); // after-2--> we can also pass collection name in db as well
            callback()
        })
        .catch(err => {
            console.log(err);
            // throw err;
        })
}

//after-3
const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found!'
}

// module.exports = {
//     mongoConnect,
//     getDb
// }


exports.mongoConnect = mongoConnect;
exports.getDb = getDb