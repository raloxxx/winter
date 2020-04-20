const path = require('path')

const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const routes = require('./controllers')


const app = express();
const port = process.env.PORT || 3000;



// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
})



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


app.use("/", routes)


mongoose.connect('mongodb+srv://juan:juan@bytecode-dhysx.mongodb.net/dbwinter?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(msg => {
    console.log("conectado")
    app.listen(port, () => console.log(`App listening to port ${port}`));
})
