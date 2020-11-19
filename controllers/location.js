const Location = require('../models/location');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

//get location by Id
exports.locationById = (req, res, next, id) => {
    Location.findById(id).exec((err, location) => {
        if (err || !location) {
            return res.status(400).json({
                error: 'Location does not exist'
            });
        }
        req.location = location;
        next();
    });
};

//create location
exports.create = (req, res) => {
    const location = new Location(req.body);
    location.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

//get location
exports.read = (req, res) => {
    return res.json(req.location);
};

//update location
exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('location update param', req.params.locationId);

    const location = req.location;
    location.name = req.body.name;
    location.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

//delete location
exports.remove = (req, res) => {
    const location = req.location;
    Product.find({ location }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${location.name}. It has ${data.length} associated products.`
            });
        } else {
            location.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Location deleted'
                });
            });
        }
    });
};

//get list of locations
exports.list = (req, res) => {
    Location.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
