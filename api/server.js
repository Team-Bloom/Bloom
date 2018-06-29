const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require('express');
const app = express();
const { ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET } = require('../secrets.js')

app.get('/token', function(request, response) {
  //we could change this to somehow grab the current user that is logged in
  var identity = 'ALWAYS KIRK';

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  response.send({
      identity: identity,
      token: token.toJwt()
  });
});
