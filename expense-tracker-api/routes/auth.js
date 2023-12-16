import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route for initiating Google Authentication
router.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Callback route for google to redirect to
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), // Turn off session as we're using tokens
    (req, res) => {
        // Convert Sequelize model instance to a plain object
        const user = req.user.toJSON();

        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create a JWT token
    
        // Send the token to the frontend
        res.redirect(`${process.env.FRONTEND_BASE_URL}/#token=${token}`);
    }
);

export default router;
