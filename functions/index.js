const functions = require('firebase-functions');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require('express');
const app = express();
const cors = require('cors')
const { ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET } = require('../secrets')

app.use(cors ({origin: true}))

app.get('*', (request, response) => {
  //we could change this to somehow grab the current user that is logged in
  var identity = 'ALWAYS KIRK';

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET)
  // var token = new AccessToken(functions.config().twilio.account_sid, functions.config().twilio.api_key_sid, functions.config().twilio.api_key_secret);
  console.log(token)
  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  response.send({
    identity: identity,
    token: token.toJwt(),
  });
});

exports.token = functions.https.onRequest(app);
