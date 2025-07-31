const express = require('express');
const sessionRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { User, Session } = require('../db');
const { getAllSessions , mySessions , getSessionById , saveDraft , publishSession , updateSession} = require('../controller/sessionController');

sessionRouter.get('/sessions', getAllSessions);

sessionRouter.get('/my-sessions', authMiddleware , mySessions);

sessionRouter.get('/my-sessions/:id', authMiddleware, getSessionById);

sessionRouter.post('/my-sessions/save-draft', authMiddleware, saveDraft);

sessionRouter.post('/my-sessions/publish', authMiddleware, publishSession);

sessionRouter.put('/my-sessions/save-draft/:id', authMiddleware, updateSession);


module.exports = sessionRouter;
