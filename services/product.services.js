const Product = require("../models/Product");

exports.getProductService = async () => {
    const products = await Product.find({});
    return products;
}

exports.createProductService = async (data) => {
    const product = await Product.create(data)
    return product;
}

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, {
        // before update, validate the data accroding to schema (ProductSchema)
        runValidators: true
    });
    return result;

    // another way to validate data before updating

    // const products = await Product.findById(productId);
    // const result = await product.set(data).save();
    // return result;

}

exports.bulkkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true })
    // return result;

    const products = [];
    data.ids.forEach((product) => {
        products.push(Product.updateOne({ _id: productid }, product.data))
    })
    const result = await Promise.all(products)
    return result;
}