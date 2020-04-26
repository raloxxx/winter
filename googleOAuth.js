const readline = require('readline')
const fs = require('fs')

const { google } = require('googleapis')


// Google apis
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
});


function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    console.log(client_id, client_secret, redirect_uris)
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}


function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });

    var fileMetadata = {
        'name': 'photo.jpg'
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream('public/assets/uploads/8fc21c9a-4869-4958-8787-12b02f6d031e-1587633552500.jpg')
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('File Id: ', file.id);
            return res.status(200).json({
                status: true,
                data: product
            })
        }
    });
}
