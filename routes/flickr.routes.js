const express = require('express')

const router = express.Router()

router
    .get('/auth', async (req, res, next) => {

        const { oauth, requestToken } = await flickrOAuth()

        // var flickr = new Flickr(Flickr.OAuth.createPlugin(
        //     'fd2688ed60c8cd151c13cf939cc4847c',
        //     'e69c7c4f88c61e5e',
        //     requestToken.oauth_token,
        //     requestToken.oauth_token_secret
        //   ));

        //   console.log(flickr._)

        //   var upload = new Flickr.Upload(flickr._, './public/assets/uploads/Collage sin título (1)-1587634775523.jpg', {
        //     title: 'Works on MY machine!'
        //   });

        //   upload.then(function (res) {
        //     console.log('yay!', res.body);
        //   }).catch(function (err) {
        //     console.error('bonk', err);
        //   });

        url = oauth.authorizeUrl(requestToken.oauth_token, 'write'); // "https://www.flickr.com/services/oauth..."
        res.setHeader("Location", url);
        res.statusCode = 302;
        res.end();

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