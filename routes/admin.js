const express = require("express")
const router = express.Router()

const adminController = require("../controllers/admin")
const imageUpload = require("../helpers/image-upload");

const isAdmin = require("../middlewares/admin")
const Product = require("../models/product")

// products
router.post("/products/:productId/update", [isAdmin], imageUpload.upload.single("image"), adminController.post_update_product)

router.get("/products/:productId/update", [isAdmin], adminController.get_update_product)

router.post("/products/create", [isAdmin], imageUpload.upload.single("image"), adminController.post_create_product)

router.get("/products/create", [isAdmin], adminController.get_create_product)

router.get("/products", [isAdmin], adminController.get_products)

// categories
router.post("/categories/:categoryId/delete", [isAdmin], adminController.post_delete_category)

router.post("/categories/:categoryId/update", [isAdmin], adminController.post_update_category)

router.get("/categories/:categoryId/update", [isAdmin], adminController.get_update_category)

router.post("/categories/create", [isAdmin], adminController.post_create_category)

router.get("/categories/create", [isAdmin], adminController.get_create_category)

router.get("/categories", [isAdmin], adminController.get_categories)

router.get("/", [isAdmin], adminController.get_dashboard)

module.exports = router