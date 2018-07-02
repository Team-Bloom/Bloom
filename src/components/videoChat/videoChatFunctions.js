// const AccessToken = require('twilio').jwt.AccessToken;
// const VideoGrant = AccessToken.VideoGrant;
// const { ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET } = require('../../../functions/secrets');

// const tokenGenerator = (identity, room) => {
//   // Create an access token which we will sign and return to the client,
//   // containing the grant we just created
//   const token = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

//   // Assign identity to the token
//   token.identity = identity;

//   // Grant the access token Twilio Video capabilities
//   const grant = new VideoGrant();
//   grant.room = room;
//   token.addGrant(grant);

//   // Serialize the token to a JWT string
//   return token.toJwt();
// };

// // const buttonJoin = async (roomName, token) => {
// //   try {
// //     if (roomName) {
// //       alert('Please enter a room name.');
// //       return;
// //     }

// //     this.log("Joining room '" + roomName + "'...");
// //     var connectOptions = {
// //       name: roomName,
// //       logLevel: 'debug',
// //     };

// //     // if (this.previewTracks) {
// //     //   connectOptions.tracks = this.previewTracks;
// //     // }

// //     // Join the Room with the token from the server and the
// //     // LocalParticipant's Tracks.
// //     await Video.connect(
// //       token,
// //       connectOptions
// //     );
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // // Bind button to leave Room.
// // const buttonLeave = activeRoom => {
// //   console.log('Leaving room...');
// //   activeRoom.disconnect();
// // };

// module.exports = { tokenGenerator };
