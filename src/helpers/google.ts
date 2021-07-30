const {OAuth2Client} = require('google-auth-library');



const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

const  verifyGoogleToken = async(idToken: string)=>{
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_GOOGLE_ID,
  });
  const 
  {
      name,
      email,
      picture: img
  } = ticket.getPayload();

  return {name, email, img}
}