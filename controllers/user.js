const Product = require("../models/product")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const slugfield = require("../helpers/slugfield")
const jwt = require("jsonwebtoken")

exports.post_logout = (req, res) => {
    req.session.destroy()

    return res.redirect("/login")
}

exports.post_login = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(400).json({ email: "Böyle bir email kullanılmıyor." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({ password: "Parola uyuşmuyor." })
        }

        const token = jwt.sign({ _id: user._id }, "jwtPrivateKey")
        
        req.session.authToken = token
        return res.status(200).json({ success: true })
    }catch(err){
        return res.status(400).json({ error: "Bilinmeyen hata" })
    }
}

exports.get_login = (req, res) => {
    return res.render("auth/login")
}

exports.post_register = async (req, res) => {
    try{
        const { username, email, password } = req.body

        const isExistEmail = await User.findOne({ email: email })
        if(isExistEmail){
            return res.status(400).json({ email: "Bu email kullanılmaktadır." })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(200).json({ success: true })
    }catch(err){
        return res.status(400).json({ error: "Bilinmeyen hata" })
    }
}

exports.get_register = (req, res) => {
    return res.render("auth/register")
}

exports.get_products = async (req, res) => {
    const { query } = req.query
    let products = []

    if(query){
        products = await Product.find({ name: /.*query.*/})
    }else{
        products = await Product.find().sort({ createdAt: -1 })
    }

    return res.render("users/products", {
        products: products
    })
}

exports.post_product_detail = async (req, res) => {
    try{
        const { productid } = req.params
        const product = await Product.findOne({ _id: productid })
        if(!product){
            return res.status(400).json({ error: "Böyle bir ürün yok." })
        }

        const token = req.session.authToken
        if(!token){
            return res.status(400).json({ error: "Giriş yapmadınız" })
        }
        const decodedToken = jwt.verify(token, "jwtPrivateKey")
        const user = await User.findOne({ _id: decodedToken._id })

        const isExist = user.products.includes(productid)
        if(!isExist){
            let userProducts = []
            user.products.map(up => {
                userProducts.push(up)
            })
    
            userProducts.push(productid)
    
            user.products = userProducts
            await user.save()
            return res.status(200).json({ success: true })
        }
        
        return res.status(400).json({ error: "Ürün daha önce eklenmiş." })
    }catch(err){
        return res.status(400).json({ error: "Bilinmeyen hata" })
    }
}

exports.get_product_detail = async (req, res) => {
    try{
        const { productid } = req.params
        const product = await Product.findOne({ _id: productid })
        
        return res.render("users/product-detail", {
            product: product
        })
    }catch(err){
        console.log(err)
    }
}

exports.home = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 })

    res.render("users/home", {
        products: products
    })
}