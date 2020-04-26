const path = require('path')
const fs = require('fs')

const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const readline = require('readline')
const Flickr = require('flickr-sdk')




const routes = require('./controllers')


const app = express();

const port = process.env.PORT || 3000;




// var flickr = new Flickr(Flickr.OAuth.createPlugin(
//   'fd2688ed60c8cd151c13cf939cc4847c',
//   'e69c7c4f88c61e5e',
//   '72157714052110986-d8171b878da7f085',
//   '9f08126511241f22'
// ));

// console.log(flickr._)

// var upload = new Flickr.Upload(flickr._, './public/assets/uploads/Collage sin título (1)-1587634775523.jpg', {
//   title: 'Works on MY machine!'
// });

// upload.then(function (res) {
//   console.log('yay!', res.body);
// }).catch(function (err) {
//   console.error('bonk', err);
// });



// var flickr = new Flickr('fd2688ed60c8cd151c13cf939cc4847c');

// flickr.photos.search({
//     user_id: '188191855@N08'
//   }).then(function (res) {
//     console.log('yay!', res.body.photos);
//   }).catch(function (err) {
//     console.error('bonk', err);
//   });




// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
})

// Files
app.use(fileUpload())

// ------------------------------------------------------- //
// Sets our app to use the handlebars engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');
// Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts/',
  defaultLayout: 'index'
}));
// ------------------------------------------------------- //


// ------------------------------------------------------- //
// BodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ------------------------------------------------------- //

app.use('/public', express.static('public'))

async function rutas() {
  let rt = await routes()
  app.use("/", rt)
}

rutas()




mongoose.connect('mongodb+srv://juan:juan@bytecode-dhysx.mongodb.net/dbwinter?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(msg => {
    console.log("conectado")
    app.listen(port, () => console.log(`App listening to port ${port}`));
  })
