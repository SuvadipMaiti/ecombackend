const Models = require('../models');

function index(req, res) {
    Models.Product.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
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
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({
                message: "post not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        })
    });
}

function update(req, res) {
    const productId = req.params.id;

    const updateProduct = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }

    Models.Product.update(updateProduct, { where: { id: productId } }).then(result => {
        res.status(201).json({
            message: "Product updated.",
            data: updateProduct
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function destroy(req, res) {
    const productId = req.params.id;

    Models.Product.destroy({ where: { id: productId } }).then(result => {
        res.status(200).json({
            message: "Product deleted."
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy
}