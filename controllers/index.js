const express = require("express");
const router = express.Router();

const nodemailer = require('nodemailer');

const Order = require("../models/order");
const Product = require("../models/product");

router
    .get("/", (req, res, next) => {
        res.render("product");
    })
    .get("/home", (req, res, next) => {
        let product
        Product.find(function (err, products) {
            if (err) return console.error(err);
            product = products
        })
        res.render("home", product);
    })
    .get("/car", (req, res, next) => {
        res.render("car");
    })
    .get("/product", (req, res, next) => {
        res.render("product");
    })
    .post("/product", (req, res, next) => {
        const body = req.body

        product = new Product(body)

        product.save(err => {
            if (err)
                throw err;


            console.log("Product save");
        });

        res.status(200).json({
            status: true,
            data: product
        });
    })


// ----------------------------------------------------
// .get("/contact", (req, res, nex) => {
//     res.render("contact");
// })
// .post("/contact", (req, res, nex) => {
//     const body = req.body

//     const email = body.email
//     const phone = body.phone
//     const description = body.description

//     sendMail(email, phone, description);

//     res.render("contact");
// })
// ----------------------------------------------------


// ----------------------------------------------------
// .get("/course/:name", (req, res, nex) => {
//     const params = req.params

//     const course = selectInformation(params.name);
//     console.log(course)
//     res.render("course", {course: course});
// })
// .post("/course/:name", (req, res, nex) => {
//     const params = req.params;
//     const body = req.body;

//     const course = new Course({
//         description: params.name,
//         email: body.email,
//         lastName: body.lastName,
//         name: body.name,
//         phone: body.phone
//     });

//     course.save(err => {
//         if (err) 
//             throw err;


//         console.log("Author successfully saved.");
//     });
//     res.render("courses");
// });
// // ----------------------------------------------------

module.exports = router;


// function sendMail(email, phone, content) {

//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'bytecodesac@gmail.com',
//             pass: 'loper102'
//         }
//     });

//     var mailOptions = {
//       from: email,
//       to: 'bytecodesac@gmail.com',
//       subject: 'Curso de verano',
//       text: 'Phone:' + phone + '\n' + content
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error){
//           console.log(error);
//       } else {
//           console.log("Email sent");
//       }
//     });
// }

// function selectInformation(course) {

//     const data = {
//         php: {
//             title: 'Manipulando datos con PHP',
//             img: '/public/assets/imagenes/php.jpg',
//             description: 'PHP para principiantes: aprenda todo lo que necesita para convertirse en un desarrollador profesional de PHP con ejercicios y proyectos prácticos, y al final su aprenda a crear su propio Sistema de Gestión de Contenido CMS',
//             learn: [
//                 'Aprenderá a declarar variables en PHP',
//                 'Aprenderá a definir funciones en PHP',
//                 'Aprenderá de estructuras de control en PHP',
//                 'Aprenderá a usar base de datos MySQL',
//                 'Programación Orientada a Objetos con PHP',
//                 'Como usar formularios para enviar datos a una base de datos',
//                 'Seguridad en PHP',
//                 'Aprenderá sobre sesiones en PHP',
//                 'Aprenderá a crear su propio sistema de gestión de contenido CMS desde 0 con PHP'
//             ],
//             requirements: [
//                 'No necesita tener conocimiento base en programación o lenguajes de programación.',
//                 'Muchas ganas de aprender '
//             ]
//         },
//         html: {
//             title: 'CURSO HTML Y CSS',
//             img: '/public/assets/imagenes/html.jpg',
//             description: 'APRENDE CSS POR PRIMERA O MEJORA TUS HABILIDADES DE CSS Y SUMÉRGETE AÚN MÁS. CADA DESARROLLADOR WEB TIENE QUE SABER CSS',
//             learn: [
//                 'RECORDANDO HTML, INICIANDO CON CSS, VARIABLES CSS',
//                 'SELECTORES CSS',
//                 'FONDOS, COLORES, BORDES, PSEUDOELEMENTOS',
//                 'ESPECIFIDAD, HERENCIA Y CASCADA',
//                 'MODELO DE CAJA',
//                 'POSICIANAMIENTO',
//                 'FLEXBOX',
//                 'DISEÑAR UNA INTERFAZ CON TODO LO APRENDIDO'
//             ],
//             requirements: [
//                 'DEBE CONOCER LOS CONCEPTOS BÁSICOS SOBRE HTML Y EL DESARROLLO WEB EN GENERAL',
//                 'NO SE REQUIEREN CONOCIMIENTOS AVANZADOS DE HTML O DESARROLLO WEB',
//                 'NO SE REQUIERE NINGÚN CONOCIMIENTO DE CSS! ¡LO APRENDERÁS DURANTE EL CURSO'
//             ]
//         },
//         python: {
//             title: 'Curso de Python',
//             img: '/public/assets/imagenes/js.jpg',
//             description: 'Python es un lenguaje de programacion orientado a objetos de alto nivel con una sintaxis particular. Python es un lenguaje con gran potencial en la ciencia de datos. Sin embargo su aplicacion en el desarrollo de paginas web ha crecido en los ultimos años, python es un lenguaje potente para desarrollar APiREST.',
//             learn: [
//                 'Conceptos basicos',
//                 'Variables y tipos de datos',
//                 'Estructuras de control',
//                 'Funciones, expresiones regulares y porgramacion orientada a objetos',
//                 'Trabajar bases de datos con python',
//                 'Flask: El microframwork para desarrollar aplicaciones web',
//                 'Hacer un API RESTFULL con Flask'
//             ],
//             requirements: [
//                 'Muchas ganas de aprender y dar un paso a tu formación profesional.'
//             ]
//         },
//         js: {
//             title: 'Aprende a crear un juego con JavaScript',
//             img: '/public/assets/imagenes/js.jpg',
//             description: 'JavaScript es un lenguaje de programación que se trabaja desde el navegador. Construye programas, conoce el entorno, las condicionales y las estructuras repetitivas. Aprende cuáles son y cómo se declaran las variables y las funciones. Nuestra meta será construir un juego utilizando los conocimientos adquiridos en este curso, este curso es ideal para iniciar en tu desarrollo profesional de JavaScript.',
//             learn: [
//                 'Reconocer las características del lenguaje de JavaScript.',
//                 'Declarar variables y funciones.',
//                 'Utilizar arreglos.',
//                 'Entender el sistema de asincronismo de JS.',
//                 'Comprender promesas.',
//                 'Programación orientada a Objetos.'
//             ],
//             requirements: [
//                 'Muchas ganas de aprender y dar un paso a tu formación profesional.'
//             ]
//         },
//     }

//     switch(course) {
//         case 'php':
//             return data.php
//         case 'html':
//             return data.html
//         case 'js':
//             return data.js
//         case 'python':
//             return data.python
//     }
// }
