const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const multer = require ("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");
const querystring = require('node:querystring'); 
const cookieParser = require("cookie-parser");
const cors = require('cors');

router.use(express.json());
const fileUpload = multer();

cloudinary.config({ 
  cloud_name: 'dmipwi9rx', 
  api_key: '382832142727888', 
  api_secret: '7JsGypjZkyyKHG7IPWnRnEMOOU4' 
});

router.get("/", (req, res) => {
    eventosSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

///---------------------------------------------- OAUTH ----------------------------------------------///

const config = {
  clientId: '206495621357-507l7s1eba0p68fdhjonjeksf2i5uous.apps.googleusercontent.com',
  clientSecret: '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',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUrl: 'https://create-react-app-beta-beige.vercel.app',
  clientUrl: 'https://create-react-app-beta-beige.vercel.app',
  tokenSecret: 'secret',
  tokenExpiration: 36000,
  postUrl: 'https://jsonplaceholder.typicode.com/posts'
};

const authParams = querystring.stringify({
  client_id: '206495621357-507l7s1eba0p68fdhjonjeksf2i5uous.apps.googleusercontent.com',
  redirect_uri: 'https://create-react-app-beta-beige.vercel.app',
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',  
  state: 'standard_oauth',
  prompt: 'consent',
});

const getTokenParams = (code) => querystring.stringify({
  client_id: '206495621357-507l7s1eba0p68fdhjonjeksf2i5uous.apps.googleusercontent.com',
  client_secret: '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',
  code,
  grant_type: 'authorization_code',
  redirect_uri: 'https://create-react-app-beta-beige.vercel.app',
});

router.use(cors({
  origin: [
    config.clientUrl,
  ],
  credentials: true,
}));

// Parse Cookie
router.use(cookieParser());

// Verify auth
const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, config.tokenSecret);
    return next();
  } catch (err) {
    console.error('Error: ', err);
    res.status(401).json({ message: "Unauthorized" });
  }
};  

router.get('/auth/url', (_, res) => {
  res.json({
    url: `${config.authUrl}?${authParams}`,
  });
});

router.get('/auth/token', async (req, res) => {
  const { code } = req.query;
  if (!code) return res. status(400).json({ message: 'Authorization code must be provided' });
  try {
    // Get all parameters needed to hit authorization server
    const tokenParam = getTokenParams(code);
    // Exchange authorization code for access token (id token is returned here too)
    const { data: { id_token} } = await axios.post(`${config.tokenUrl}?${tokenParam}`);
    if (!id_token) return res.status(400).json({ message: 'Auth error' });
    // Get user info from id token
    const { email, name, picture } = jwt.decode(id_token);
    const user = { name, email, picture };
    // Sign a new token
    const token = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration });
    // Set cookies for user
    res.cookie('token', token, { maxAge: config.tokenExpiration, httpOnly: true,  })
    // You can choose to store user in a DB instead
    res.json({
      user,
    })
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.get('/auth/logged_in', (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });
    const { user } = jwt.verify(token, config.tokenSecret);
    const newToken = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration });
    // Reset token in cookie
    res.cookie('token', newToken, { maxAge: config.tokenExpiration, httpOnly: true,  })
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

router.post("/auth/logout", (_, res) => {
  // clear cookie
  res.clearCookie('token').json({ message: 'Logged out' });
});

router.get('/user/posts', auth, async (_, res) => {
  try {
    const { data } = await axios.get(config.postUrl);
    res.json({ posts: data?.slice(0, 5) });
  } catch (err) {
    console.error('Error: ', err);
  }
});



module.exports = router;