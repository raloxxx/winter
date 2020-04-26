const Flickr = require('flickr-sdk')


let url = ''

let oauth = new Flickr.OAuth(
    'fd2688ed60c8cd151c13cf939cc4847c',
    'e69c7c4f88c61e5e'
);
// var upload = new Flickr.Upload(oauth, 'upload.png', {
//     title: 'Works on MY machine!'
// });

// upload.then(function (res) {
//     console.log('yay!', res.body);
// }).catch(function (err) {
//     console.error('bonk', err);
// });

module.exports = async () => {
    requestToken = await oauth.request('http://localhost:3000/auth/callback').then(function (res) {
        return res.body
    }).catch(function (err) {
        console.error('bonk', err);
    });


    return {
        oauth,
        requestToken
    }
}


// requestToken.then((res) => {
//     console.log(res)
//     url = oauth.authorizeUrl(res.oauth_token, 'write'); // "https://www.flickr.com/services/oauth..."

//     console.log('toooo ', url)

//     oauth.verify(res.oauth_token, '6ddf9661e7afa101', res.oauth_token_secret).then(function (res) {
//         console.log('oauth token:', res.body.oauth_token);
//         console.log('oauth token secret:', res.body.oauth_token_secret);
//       }).catch(function (err) {
//        console.log('bonk', err);
//       });
// })

