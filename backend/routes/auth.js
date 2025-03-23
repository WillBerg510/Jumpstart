const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// register endpoint
// POST /auth/register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ error: 'There is already a registered user under this email.' }); // 400 is bad request
        }

        const newUser = await User.create({ email, password });
        const pojoUser = newUser.toObject()
        delete pojoUser.password; // remove password from response for security
        delete pojoUser.__v; // remove __v because its unnecessary

        res.status(201).json({ user: pojoUser }); // 201 is created
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user' }); // 500 is internal server error
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'This email is not registered.' }); // 404 is not found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' }); // 401 is unauthorized
        }

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {expiresIn: '1d'}); // grant the user a token valid for one day
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' }); // 500 is internal server error
    }
});

module.exports = router;