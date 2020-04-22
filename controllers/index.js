const fs = require('fs')
const path = require('path')
var util = require('util')

const express = require("express")
const multer = require('multer')
const router = express.Router()

const Order = require("../models/order")
const Product = require("../models/product")


// Configuracion de multer, localizacion de archivo

let imgName = ''
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/assets/uploads');
    },
    filename: function (req, file, callback) {
        const splitName = file.originalname.split('.')
        const ext = splitName[splitName.length - 1]
        imgName = file.fieldname + '-' + Date.now() + '.' + ext
        callback(null, imgName);
    }
});
// ----------------------------------------------------------------


router
    .get("/", (req, res, next) => {
        res.render("product")
    })
    // .get("/", (req, res, next) => {
    //     res.render("presentation")
    // })
    .get("/home", (req, res, next) => {
        Product.find(function (err, products) {
            if (err) return console.error(err)
        }).lean()
            .exec(function (error, body) {
                res.render("home", { product: body })
            })

    })
    .get("/home/:_id", (req, res, next) => {
        let params = req.params
        Product.findById(params._id)
            .exec(function (error, body) {
                res.status(200).json({
                    status: true,
                    data: body
                })
            })

    })
    .get("/car", (req, res, next) => {
        res.render("car")
    })
    .get("/product", (req, res, next) => {
        res.render("product")
    })
    .post("/product", (req, res, next) => {

        const body = req.body
        body.img = imgName
        product = new Product(body)

        product.save(err => {
            if (err)
                throw err
            console.log("Product save")
        })

        res.status(200).json({
            status: true,
            data: product
        })
    })
    .post('/product/img', (req, res, next) => {
        const upload = multer({ storage: storage }).single("img");

        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });

    })

module.exports = router




