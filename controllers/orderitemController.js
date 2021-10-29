const Models = require('../models');
const Validator = require('fastest-validator');

function index(req, res) {
    Models.OrderItem.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function create(req, res) {
    const newOrderItem = {
        quantity: req.body.quantity,
        product: req.body.product
    }

    const schema = {
        quantity: { type: "number", optional: false, max: "100" },
        product: { type: "number", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(newOrderItem, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.OrderItem.create(newOrderItem).then(result => {
        res.status(201).json({
            message: "OrderItem submited.",
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

    Models.OrderItem.findByPk(id).then(result => {
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
    const orderItemId = req.params.id;

    const updateOrderItem = {
        quantity: req.body.quantity,
        product: req.body.product
    }

    const schema = {
        quantity: { type: "number", optional: false, max: "100" },
        product: { type: "number", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(updateOrderItem, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.OrderItem.update(updateOrderItem, { where: { id: orderItemId } }).then(result => {
        res.status(201).json({
            message: "OrderItem updated.",
            data: updateOrderItem
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function destroy(req, res) {
    const orderItemId = req.params.id;

    Models.OrderItem.destroy({ where: { id: orderItemId } }).then(result => {
        res.status(200).json({
            message: "OrderItem deleted."
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