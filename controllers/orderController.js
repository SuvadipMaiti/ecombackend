const Models = require('../models');
const Validator = require('fastest-validator');

function index(req, res) {
    Models.Order.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function create(req, res) {
    const newOrder = {
        orderItems: req.body.orderItems,
        description: req.body.description,
        category: req.body.category,
        countInStock: req.body.countInStock,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status
    }

    const schema = {
        orderItems: { type: "string", optional: false, max: "100" },
        description: { type: "string", optional: false, max: "500" },
        category: { type: "number", optional: false, max: "100" },
        countInStock: { type: "number", optional: false, max: "100" },
        shippingAddress1: { type: "string", optional: false, max: "500" },
        shippingAddress2: { type: "string", optional: false, max: "500" },
        city: { type: "string", optional: false, max: "500" },
        zip: { type: "string", optional: false, max: "20" },
        country: { type: "string", optional: false, max: "100" },
        phone: { type: "string", optional: false, max: "100" },
        status: { type: "string", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(newOrder, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.Order.create(newOrder).then(result => {
        res.status(201).json({
            message: "Order submited.",
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

    Models.Order.findByPk(id).then(result => {
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
    const orderId = req.params.id;

    const updateOrder = {
        orderItems: req.body.orderItems,
        description: req.body.description,
        category: req.body.category,
        countInStock: req.body.countInStock,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status
    }

    const schema = {
        orderItems: { type: "string", optional: false, max: "100" },
        description: { type: "string", optional: false, max: "500" },
        category: { type: "number", optional: false, max: "100" },
        countInStock: { type: "number", optional: false, max: "100" },
        shippingAddress1: { type: "string", optional: false, max: "500" },
        shippingAddress2: { type: "string", optional: false, max: "500" },
        city: { type: "string", optional: false, max: "500" },
        zip: { type: "string", optional: false, max: "20" },
        country: { type: "string", optional: false, max: "100" },
        phone: { type: "string", optional: false, max: "100" },
        status: { type: "string", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(updateOrder, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.Order.update(updateOrder, { where: { id: orderId } }).then(result => {
        res.status(201).json({
            message: "Order updated.",
            data: updateOrder
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function destroy(req, res) {
    const orderId = req.params.id;

    Models.Order.destroy({ where: { id: orderId } }).then(result => {
        res.status(200).json({
            message: "Order deleted."
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