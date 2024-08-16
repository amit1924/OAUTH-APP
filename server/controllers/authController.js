import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

// Generate a URL for Google OAuth
export const googleLogin = (req, res) => {
  const redirectUrl = `${googleAuthUrl}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=email profile`;

  res.redirect(redirectUrl);
};

// Handle Google OAuth callback
export const googleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const response = await axios.post(googleTokenUrl, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });

    const { access_token } = response.data;

    // Fetch user information
    const userInfo = await axios.get(
      `${googleUserInfoUrl}?access_token=${access_token}`
    );

    const { id, email, name, picture } = userInfo.data;

    // Find or create user
    let user = await User.findOne({
      googleId: id,
    });
    if (!user) {
      user = new User({
        googleId: id,
        email,
        name,
        avatar: picture,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Fetch current user
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
