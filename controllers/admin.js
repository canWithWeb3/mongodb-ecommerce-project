const Category = require("../models/category")
const Product = require("../models/product")
const imageUpload = require("../helpers/image-upload");
const Joi = require("joi");

// products
exports.post_update_product = async (req, res) => {
    try{
        const { productId } = req.params
        const { image, name, description, categories } = req.body

        if(req.file){
            image = req.file.filename
        }

        const product = await Product.findOne({ _id: productId })
        product.image = image
        product.name = name
        product.description = description
        product.categories = categories
        
        await product.save()

        return res.redirect("/admin/products")
    }catch(err){
        console.log(err)
    }
}

exports.get_update_product = async (req, res) => {
    try{
        const { productId } = req.params

        const product = await Product.findOne({ _id: productId }).populate("categories")
        const categories = await Category.find()

        return res.render("admin/products/update-product", {
            product: product,
            categories: categories
        })
    }catch(err){
        console.log(err)
    }
}

exports.post_create_product =  async (req, res) => {
    const { name, description, categories } = req.body
    try{
        await Product.create({
            image: req.file.filename,
            name: name,
            description: description,
            categories: categories
        })

        return res.redirect("/admin/products")
    }catch(err){
        console.log(err)
    }
}

exports.get_create_product = async (req, res) => {
    const categories = await Category.find()

    return res.render("admin/products/create-product", {
        categories: categories
    })
}

exports.get_products = async (req, res) => {
    try{
        const products = await Product.find().sort({ createdAt: -1 }).populate("categories")
        return res.render("admin/products/products", {
            products: products
        })
    }catch(err){
        console.log(err)
    }
}


// categories
exports.post_delete_category = async (req, res) => {
    try{
        const { categoryId } = req.params

        await Category.deleteOne({ _id: categoryId })

        return res.redirect("/admin/categories")
    }catch(err){
        console.log(err)
    }
}

exports.post_update_category = async (req, res) => {
    try{
        const { categoryId } = req.params
        const { name } = req.body

        const category = await Category.findOne({ _id: categoryId })
        category.name = name
        
        await category.save()

        return res.redirect("/admin/categories")
    }catch(err){
        console.log(err)
    }
}

exports.get_update_category = async (req, res) => {
    try{
        const { categoryId } = req.params

        const category = await Category.findOne({ _id: categoryId })

        return res.render("admin/categories/update-category", {
            category: category
        })
    }catch(err){
        console.log(err)
    }
}

exports.post_create_category = async (req, res) => {
    try{
        const { name } = req.body

        await Category.create({
            name: name
        })

        return res.redirect("/admin/categories")
    }catch(err){
        console.log(err)
    }
}

exports.get_create_category = async (req, res) => {
    return res.render("admin/categories/create-category")
}

exports.get_categories = async (req, res) => {
    try{
        const categories = await Category.find()

        return res.render("admin/categories/categories", {
            categories: categories
        })
    }catch(err){
        console.log(err)
    }
}

// dashboard
exports.get_dashboard = async (req, res) => {
    try{
        return res.render("admin/dashboard")
    }catch(err){
        console.log(err)
    }
}