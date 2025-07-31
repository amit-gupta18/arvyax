import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaPlus } from 'react-icons/fa';

const Mysession = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [mySessions, setMySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const isAuthenticated = () => {
        if (token) {
            return true;
        }
        return false;
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        const fetchMySessions = async () => {

            try {
                const res = await axios.get(`${baseUrl}/api/v1/my-sessions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMySessions(res.data.sessions || []);
            } catch (err) {
                console.error("Failed to fetch my sessions", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMySessions();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Sessions</h1>
                <button
                    onClick={() => navigate("/editor")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    <FaPlus />
                    Add Session
                </button>
            </div>

            {mySessions.length === 0 ? (
                <div className="text-center py-8">No sessions created yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mySessions.map((session) => (
                        <div key={session._id} className="p-4 border shadow rounded-xl bg-white">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">{session.title}</h2>
                                <h2>
                                    <button
                                        onClick={() => navigate(`/editor/${session._id}`)}
                                        className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Tags: {session.tags?.join(', ') || 'None'}
                            </p>
                            <div className="mt-3 flex gap-3">
                                <a
                                    href={session.jsonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    View JSON
                                </a>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Mysession;
