// dotenv
const dotenv = require('dotenv');
dotenv.config();

// express
const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// google apis
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.CLIENT_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

// nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.CLIENT_NAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.CLIENT_REFRESH_TOKEN,
        accessToken: accessToken,
    },
});

transporter.verify((error, success) => {
    error ? console.log(error) : console.log(success);
});

// routes
app.post('/send', (request, response) => {
    let { to, invoiceNum, html, attachment } = request.body;
    const message = {
        from: process.env.CLIENT_NAME,
        to: 'martinwillnorman@gmail.com',
        subject: 'Invoice - Alliance Builders Inc.',
        // html,
        text: `Invoice # ${invoiceNum} Attached \n\n Robert Martin - President \n Alliance Builders \n 24931 Avonlea Drive \n Chantilly VA 20152`,
        attachments: [
            {
                // encoded string as an attachment
                filename: `alliance_builders_invoice_#${invoiceNum}.pdf`,
                path: attachment,
            },
        ],
    };

    transporter.sendMail(message, (error) => {
        error
            ? response.status(500).json({
                  message: 'Email failed to send!',
              })
            : response.status(200).json({
                  message: 'Email successfuly sent!',
              });
    });
});
