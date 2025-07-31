import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SessionEditor = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token");

    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [jsonUrl, setJsonUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('draft'); // default to draft

    useEffect(() => {
        if (isEditMode) {
            const fetchSession = async () => {
                try {
                    const res = await axios.get(`${baseUrl}/api/v1/my-sessions/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const session = res.data.session;
                    setTitle(session.title || '');
                    setTags(session.tags?.join(', ') || '');
                    setJsonUrl(session.json_file_url || '');
                } catch (err) {
                    console.error("Failed to fetch session for editing", err);
                }
            };

            fetchSession();
        }
    }, [id]);

    const handleSave = async () => {
        if (!title.trim() || !jsonUrl.trim()) {
            alert("Title and JSON URL are required.");
            return;
        }

        const payload = {
            title,
            tags: tags.split(',').map(t => t.trim()),
            json_file_url: jsonUrl,
            status, // include status in the payload
        };

        try {
            setLoading(true);

            if (isEditMode) {
                
                await axios.put(`${baseUrl}/api/v1/my-sessions/save-draft/${id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Session updated.");
            } else {
                console.log("Creating new session with payload:", payload);
                await axios.post(`${baseUrl}/api/v1/my-sessions/save-draft`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Session created.");
            }

            navigate("/my-sessions");
        } catch (err) {
            console.error("Save failed", err);
            alert("Failed to save session.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded-2xl border border-blue-100">
            <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                {isEditMode ? (
                    <span className="inline-flex items-center px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm font-semibold">Edit</span>
                ) : (
                    <span className="inline-flex items-center px-2 py-1 bg-green-200 text-green-800 rounded text-sm font-semibold">New</span>
                )}
                Session
            </h1>

            <div className="mb-5">
                <label className="block mb-1 text-sm font-semibold text-blue-900">Title</label>
                <input
                    type="text"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter session title"
                />
            </div>

            <div className="mb-5">
                <label className="block mb-1 text-sm font-semibold text-blue-900">Tags <span className="text-xs text-gray-500">(comma-separated)</span></label>
                <input
                    type="text"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. meditation, yoga"
                />
            </div>

            <div className="mb-5">
                <label className="block mb-1 text-sm font-semibold text-blue-900">JSON File URL</label>
                <input
                    type="text"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={jsonUrl}
                    onChange={(e) => setJsonUrl(e.target.value)}
                    placeholder="https://example.com/session.json"
                />
            </div>

            <div className="mb-6 flex items-center gap-6">
                <span className="font-semibold text-blue-900">Status:</span>
                <label className="inline-flex items-center gap-1">
                    <input type="radio" name="status" value="draft" checked={status === 'draft'} onChange={() => setStatus('draft')} className="accent-blue-600" />
                    <span className="text-sm">Draft</span>
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="radio" name="status" value="published" checked={status === 'published'} onChange={() => setStatus('published')} className="accent-green-600" />
                    <span className="text-sm">Published</span>
                </label>
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition 
                    ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"} 
                    text-white shadow`}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        Saving...
                    </span>
                ) : isEditMode ? "Update Session" : "Create Session"}
            </button>
        </div>
    );
};

export default SessionEditor;
