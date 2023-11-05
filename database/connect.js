const mongoose = require('mongoose');

//setting up connection string for mongoose

const connectDb = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDb;