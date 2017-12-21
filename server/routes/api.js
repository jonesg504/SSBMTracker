const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://jonesg504:Ff12345MC@ec2-34-227-93-43.compute-1.amazonaws.com:27017/dummyDB', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};
//jonesg504:Ff12345MC@ec2-34-227-93-43.compute-1.amazonaws.com:27017/dummyDB
//mongodb://localhost:27017/mean
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
