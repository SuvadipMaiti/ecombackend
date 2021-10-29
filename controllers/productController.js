const Models = require('../models');
const Validator = require('fastest-validator');

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
        category: req.body.category,
        countInStock: req.body.countInStock,
        image: req.body.image
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" },
        description: { type: "string", optional: false, max: "500" },
        category: { type: "number", optional: false, max: "100" },
        countInStock: { type: "number", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(newProduct, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
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

    Models.Product.findByPk(id, {
        attributes: ["name"],
        include: ["belongsToCategory"]
    }).then(result => {
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

    const schema = {
        name: { type: "string", optional: false, max: "100" },
        description: { type: "string", optional: false, max: "500" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(updateProduct, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
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