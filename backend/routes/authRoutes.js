const express = require('express');
const authRouter = express.Router();

console.log("Auth Router Loaded");
authRouter.post("/register", (req, res) => {
    // Handle user registration
    res.json({
        message : "This is register route"
    })
});
authRouter.post("/login", (req, res) => {
    // Handle user login
    res.json({
        message : "This is login route"
    })
});

module.exports = authRouter;