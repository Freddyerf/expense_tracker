import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
    try {
      const currentUser = await User.findOne({ where: { googleId: profile.id } });
      if (currentUser) {
        done(null, currentUser);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        });
        done(null, newUser);
      }
    } catch (error) {
      done(error, null);
    }
  }
));

  export default passport;