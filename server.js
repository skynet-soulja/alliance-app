// path
const path = require('path');

// dotenv
const dotenv = require('dotenv');
dotenv.config();

// express
const express = require('express');
const favicon = require('express-favicon');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(favicon(__dirname + '/client/build/favicon.ico'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.G_USER,
        pass: process.env.G_PW,
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
        to,
        bcc: "bmartinalliance@gmail.com",
        // bcc: process.env.CLIENT_NAME,
        subject: `Invoice # ${invoiceNum} - Alliance Builders Inc. `,
        // html,
        text: `See Attached \n\n Robert Martin - President \n Alliance Builders \n 24931 Avonlea Drive \n Chantilly VA 20152`,
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

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
