const express = require('express');
const authRouter = express.Router();
const { User , Session } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


authRouter.post("/register", async (req, res) => {
    const { email , password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            email,
            password_hash: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id  }, process.env.JWT_SECRET);
        
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token: token
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Error signing up user",
        });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password_hash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    res.json({
        message: "User logged in successfully",
        user: foundUser,
        token: token
    });
});

module.exports = authRouter;