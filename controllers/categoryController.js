const Models = require('../models');
const Validator = require('fastest-validator');
const { Product } = require('../models');

function index(req, res) {
    Models.Category.findAll({
        attributes: ["name", "icon"],
        include: [{
            model: Product,
            as: "hasManyProducts",
            attributes: ["name"]
        }]
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function create(req, res) {
    const newCategory = {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(newCategory, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.Category.create(newCategory).then(result => {
        res.status(201).json({
            message: "Category submited.",
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

    Models.Category.findByPk(id, {
        attributes: ["name", "icon"],
        include: [{
            model: Product,
            as: "hasManyProducts",
            attributes: ["name"]
        }]
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
    const categoryId = req.params.id;

    const updateCategory = {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(updateCategory, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed.",
            error: validationResponse
        });
    }

    Models.Category.update(updateCategory, { where: { id: categoryId } }).then(result => {
        res.status(201).json({
            message: "Category updated.",
            data: updateCategory
        });
    }).catch(error => {
        res.status(500).json({
            message: "something going wrong",
            error: error
        });
    });
}

function destroy(req, res) {
    const categoryId = req.params.id;

    Models.Category.destroy({ where: { id: categoryId } }).then(result => {
        res.status(200).json({
            message: "Category deleted."
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