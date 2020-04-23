const fs = require('fs')
const path = require('path')
var util = require('util')

const express = require("express")
const multer = require('multer')
const { google } = require('googleapis')

const { auth } = require('../googleOAuth')

const Order = require("../models/order")
const Product = require("../models/product")

const router = express.Router()


// Configuracion de multer, localizacion de archivo

let imgName = ''
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let imagePath = path.join(__dirname, '../public/assets/uploads')
        console.log(imagePath)
        callback(null, imagePath);
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
        const files = req.files

        let imagePath = path.join(__dirname, '../public/assets/uploads/')

        const splitName = files.img.name.split('.')
        const ext = splitName[splitName.length - 1]
        imgName = splitName[0] + '-' + Date.now() + '.' + ext

        console.log(files)
        const drive = google.drive({ version: 'v3', auth })

        files.img.mv(imagePath + imgName, err => {
            if (err) return res.status(500).send({ message: err })
            
            product = new Product({
                code: body.code,
                description: body.description,
                img: imgName
            })

            product.save(err => {
                if (err)
                    throw err
                console.log("Product save")
            })

            res.status(200).json({
                status: true,
                data: product
            })
            return res.status(200).send({ message: 'File upload' })
        })


        // var fileMetadata = {
        //     'name': 'photo.jpg'
        // };
        // var media = {
        //     mimeType: 'image/jpeg',
        //     body: fs.createReadStream(files.img.data)
        // };
        // drive.files.create({
        //     resource: fileMetadata,
        //     media: media,
        //     fields: 'id'
        // }, function (err, file) {
        //     if (err) {
        //         // Handle error
        //         console.error(err);
        //     } else {
        //         console.log('File Id: ', file.id);
        //     }
        // });
        // 
    })
    .post('/product/img', (req, res, next) => {
        console.log("fgggggg")
        console.log(req.file)
        const upload = multer({ storage: storage }).single("img");

        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });

    })

module.exports = router




