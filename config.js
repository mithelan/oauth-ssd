const { config } = require("dotenv")

module.exports = {
  'linkedinAuth': {
    'clientID': '86ypd7wgjz2l68', // your App ID
    'clientSecret': 'PKNT0yFZlMsqkFBp', // your App Secret
    'callbackURL': 'http://127.0.0.1:3000/auth/linkedin/callback',
    'authorizationURL': 'https://www.linkedin.com/oauth/v2/authorization',
    'accessTokenURL': 'https://www.linkedin.com/oauth/v2/accessToken',
  }
}