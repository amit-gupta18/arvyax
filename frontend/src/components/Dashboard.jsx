import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [publishedSessions, setPublishedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const isAuthenticated = () => {
    if(token) {
      return true;
    }
    return false;
  };


  useEffect(() => {
    const fetchPublishedSessions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/sessions`);
        const sessions = response.data.sessions || [];
        setPublishedSessions(sessions);
      } catch (error) {
        console.error("Error fetching published sessions:", error);
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedSessions();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Published Sessions you may like to join </h1>

      {publishedSessions.length === 0 ? (
        <p className="text-center text-gray-500">No published sessions available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedSessions.map((session) => (
            <div
              key={session._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
              <div className="mb-2">
                <span className="text-sm text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {session.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={session.jsonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-blue-500 hover:underline"
              >
                View JSON File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
