const Models = require('../models');

function index(req, res) {
    const products = 'product list';
    res.send(products);
}

function create(req, res) {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }

    Models.Product.create(newProduct).then(result => {
        res.status(201).json({
            message: "Product submited.",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function show(req, res) {
    const id = req.params.id;

    Models.Product.findByPk(id).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        })
    });
}

module.exports = {
    index: index,
    create: create,
    show: show
}