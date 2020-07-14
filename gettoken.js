require('dotenv').config();

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_REDIRECT_URL,
);

const getToken = async () => {
    const { tokens } = await oauth2Client.getToken(process.env.CLIENT_CODE);
    console.info(tokens);
};

getToken();