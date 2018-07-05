const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const faker = require('faker')
const cors = require('cors')({origin: true})
const functions = require('firebase-functions');
const { ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET } = require('../secrets')

exports.token = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    var identity = faker.name.findName();
    var token = new AccessToken(ACCOUNT_SID, API_KEY_SID,API_KEY_SECRET);
    token.identity = identity;
    const grant = new VideoGrant();
    token.addGrant(grant);
    res.send({
      identity: identity,
      token: token.toJwt()
    })
  })
})

