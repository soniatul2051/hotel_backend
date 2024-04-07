const mongoose = require('mongoose');

const mongodbURL = 'mongodb://localhost:27017/hotel';

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('db connected');
})
db.on('error', (err) => {
    console.log('db connection error', err);
})
db.on('disconnected', () => {
    console.log('db disconnected');
})

module.exports = db;