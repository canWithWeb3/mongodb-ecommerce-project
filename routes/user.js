const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")

const notUser = require("../middlewares/notUser")
const user = require("../middlewares/user")

router.post("/logout", [user], userController.post_logout)

router.post("/login", [notUser], userController.post_login)

router.get("/login", [notUser], userController.get_login)

router.post("/register", [notUser], userController.post_register)

router.get("/register", [notUser], userController.get_register)

router.get("/products/", userController.get_products)

router.post("/product-detail/:productid", userController.post_product_detail)

router.get("/product-detail/:productid", userController.get_product_detail)

router.get("/home", userController.home)

router.get("/", (req, res) => res.redirect("/home"))

module.exports = router