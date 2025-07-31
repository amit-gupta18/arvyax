const {Session , User} = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

async function getAllSessions(req, res) {
    const allPublishedSessions = await Session.find({ status: 'published' });

    res.json({
        sessions: allPublishedSessions,
        message: "This is the sessions route"
    });
};

async function mySessions(req, res) {
    const mySessions = await Session.find({ user_id: req.userId });

    if (!mySessions || mySessions.length === 0) {
        return res.status(404).json({ message: "No sessions found for this user" });
    }

    res.json({
        sessions: mySessions,
        message: "This is the my-sessions route"
    });
};

async function getSessionById(req, res) {
    const sessionId = req.params.id;

    const session = await Session.findOne({ _id: sessionId, user_id: req.userId });

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.json({
        session: session,
        message: `This is the session with id ${sessionId}`
    });
}

async function saveDraft(req, res) {
    const { title, tags, json_file_url, status } = req.body;

    if (!title || !tags || !json_file_url) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // save the draft to the database . 
    await Session.create({
        user_id: req.userId,
        title,
        tags,
        json_file_url,
        status: status || 'draft',
        created_at: new Date(),
        updated_at: new Date()
    });



    res.json({
        message: "Draft saved successfully",
        data: {
            title,
            tags,
            json_file_url
        }
    });
};

async function publishSession(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await Session.findById({ userId: req.userId, _id: id });

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    const updateStatus = await Session.updateOne(
        { _id: id, user_id: req.userId },
        { status: 'published', updated_at: new Date() }
    );
    if (updateStatus.modifiedCount === 0) {
        return res.status(500).json({ message: "Failed to publish session" });
    }
    res.json({
        message: "Session published successfully",
    });
};

async function updateSession(req, res) {
    const sessionId = req.params.id;
    const updateFields = req.body;

    console.log("Update fields:", updateFields);

    if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
    }


    const session = await Session.findOneAndUpdate(
        { _id: sessionId , user_id: req.userId },
        { $set: updateFields },
        { new: true }
    );

    if (!session) {
        return res.status(404).json({ message: "Session not found " });
    }

    res.json({
        message: "Session updated successfully",
        data: session
    });
}


module.exports = {
    getAllSessions,
    mySessions,
    getSessionById,
    saveDraft,
    publishSession,
    updateSession
};