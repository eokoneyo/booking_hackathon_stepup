const tests = require('../models/tests.model')

module.exports = {
    createTest,
    readTests,
    readTest,
    //updateTest,
    //deleteTest
}

let createTest = function (req, res) {

    //validate request
    if (!req.body) {

        res.status(400).json({
            "err": "Required ad object missing!"
        });
        
        return;
    }

    var test = req.body.test;

    tests.save(function (err) {

        if (err) 
        {
            console.log(err);
            res.status(500).json({ "error": err });
        }
        else 
        {
            res.status(200).json({
                "message": "Test created"
            });
        }

    });
  
};

let readTests = function (req, res) {
    tests
        .find()
        .exec(function (err, test) {

            if (err) 
            {
                console.log(err);
                res.status(500).json({ "error": err });
            }
            else 
            {
                res.status(200).json(test);
            }
            
        });
};

let readTest = function (req, res) {
    tests
        .findOne({ _id: req.body.id })
        .exec(function (err, test) {

            if (err) 
            {
                console.log(err);
                res.status(500).json({ "error": err });
            }
            else 
            {
                res.status(200).json(test);
            }

        });
};