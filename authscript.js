require('dotenv').config();
	
const { google } = require('googleapis');
  
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.CLIENT_REDIRECT_URL,
);
  
// Generate a url that asks permissions for Gmail scopes
  
const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
];
  
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: GMAIL_SCOPES,
});
  
console.info(`authUrl: ${url}`);