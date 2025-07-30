const express = require('express');
const sessionRouter = express.Router();

sessionRouter.get('/sessions', (req, res) => {
    res.json({
        message: "This is the sessions route"
    });
});

sessionRouter.get('/my-sessions', (req, res) => {
    res.json({
        message: "This is the my-sessions route"
    });
});

sessionRouter.get('/my-sessions/:id', (req , res) => {
    const sessionId = req.params.id;
    res.json({
        message: `This is the session with id ${sessionId}`
    });
});

sessionRouter.post('/my-sessions/save-draft', (req, res) => {
    // const { title, tags, json_file_url } = req.body;
    res.json({
        message: "Draft saved successfully",
        
    });
});


sessionRouter.post('/my-sessions/publish' , (req , res) => {
    // const { title, tags, json_file_url } = req.body;
    res.json({
        message: "Session published successfully",
        
    });
});

module.exports = sessionRouter;
