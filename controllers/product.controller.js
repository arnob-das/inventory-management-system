const Product = require("../models/Product");
const { getProductService, createProductService, updateProductService, bulkkUpdateProductService } = require("../services/product.services");

// get all products
exports.getProduct = async (req, res, next) => {
    try {
        const products = await getProductService()

        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "Can't get the data",
            error: error.message
        })
    }
}


// create a new product
exports.createProduct = async (req, res, next) => {

    try {
        const result = await createProductService(req.body);
        result.logger;

        res.status(200).json({
            status: 'success',
            message: "Data inserted successfully",
            data: result
        })

        next();
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "Data in not inserted",
            error: error.message
        })
    }
}

// update an existing product
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: "Successfully updated the product"
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "Couldn't update the product",
            error: error.message
        })
    }
}


// bulk update products
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkkUpdateProductService(req.body);
        res.status(200).json({
            status: 'success',
            message: "Successfully updated the products"
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "Couldn't update the products",
            error: error.message
        })
    }
}