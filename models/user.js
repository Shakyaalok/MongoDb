const { getDb } = require('../config/db')

class User {
    constructor(username, email, password, isAdmin) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin
    }

    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

}


module.exports = User;