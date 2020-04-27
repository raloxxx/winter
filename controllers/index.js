const fs = require('fs')
const path = require('path')
var util = require('util')

const express = require("express")
const multer = require('multer')
const Flickr = require('flickr-sdk')


const { google } = require('googleapis')
const flickrOAuth = require('../flickrOAuth')

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


module.exports = async () => {

    const { oauth, requestToken } = await flickrOAuth()

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

            body.description = body.description.toUpperCase()

            console.log(body)


            imgName = splitName[0] + '-' + Date.now() + '.' + ext

            files.img.mv(imagePath + imgName, err => {
                if (err) return res.status(500).send({ message: err })

                var upload = new Flickr.Upload(
                    oauth.plugin(
                        '72157714053108526-5d0892960e47bbad',
                        '6cb435a5093c4deb'
                    ),
                    imagePath + imgName, {
                    title: 'Works on MY machine!'
                });

                upload.then(function (res) {
                    console.log('yay!', res.body);
                }).catch(function (err) {
                    console.error('bonk', err);
                });
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

            })

            res.render("product")
            // var fileMetadata = {
            //     'name': 'photo.jpg'
            // };
            // var media = {
            //     mimeType: 'image/jpeg',
            //     body: fs.createReadStream(imagePath + imgName)
            // };
            // gdrive.files.create({
            //     resource: fileMetadata,
            //     media: media,
            //     fields: 'id'
            // }, function (err, file) {
            //     if (err) {
            //         // Handle error
            //         console.error(err);
            //     } else {
            //         console.log('File Id: ', file.id);
            //         return res.status(200).json({
            //             status: true,
            //             data: product
            //         })
            //     }
            // });

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
        .get('/auth', async (req, res, next) => {

            // var flickr = new Flickr(Flickr.OAuth.createPlugin(
            //     'fd2688ed60c8cd151c13cf939cc4847c',
            //     'e69c7c4f88c61e5e',
            //     '72157714053108526-5d0892960e47bbad',
            //     '6cb435a5093c4deb'
            // ));


            // url = oauth.authorizeUrl(requestToken.oauth_token, 'write'); // "https://www.flickr.com/services/oauth..."
            // res.setHeader("Location", url);
            // res.statusCode = 302;
            // res.end();

        })
        .get('/auth/callback', async (req, res, next) => {
            const query = req.query

            oauth.verify(requestToken.oauth_token, query.oauth_verifier, requestToken.oauth_token_secret).then(function (res) {
                console.log('oauth token:', res.body.oauth_token);
                console.log('oauth token secret:', res.body.oauth_token_secret);
            }).catch(function (err) {
                console.log('bonk', err);
            });

        })



    return router
}





