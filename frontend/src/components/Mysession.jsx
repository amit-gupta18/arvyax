import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Edit3, Plus, FileText, Tag, Calendar, ExternalLink, User, Settings } from "lucide-react"
import Loader from "./Loader"

const MySession = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const [mySessions, setMySessions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    if (token) {
      return true
    }
    return false
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchMySessions = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/my-sessions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setMySessions(res.data.sessions || [])
      } catch (err) {
        console.error("Failed to fetch my sessions", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMySessions()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Loading your sessions...</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center mb-2">
                <User className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Sessions</h1>
              </div>
              <p className="text-lg text-gray-600">Manage and edit your created sessions</p>
              <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{mySessions.length} Sessions Created</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => navigate("/editor")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mySessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Sessions Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              You haven't created any sessions yet. Start by creating your first session to share with the community.
            </p>
            <button
              onClick={() => navigate("/editor")}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mySessions.map((session) => (
              <div
                key={session._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {session.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => navigate(`/editor/${session._id}`)}
                      className="ml-3 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
                      title="Edit Session"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Tags Section */}
                  {session.tags && session.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Tag className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {session.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100"
                          >
                            {tag}
                          </span>
                        ))}
                        {session.tags.length > 3 && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                            +{session.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {session.tags && session.tags.length === 0 && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Tag className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">Tags</span>
                      </div>
                      <span className="text-sm text-gray-400 italic">No tags added</span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <button
                      onClick={() => navigate(`/editor/${session._id}`)}
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 group"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Session
                      <Settings className="h-4 w-4 ml-2 group-hover:rotate-90 transition-transform duration-200" />
                    </button>

                    <a
                      href={session.jsonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200 group"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View JSON File
                      <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {mySessions.length > 0 && (
        <div className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
              <div className="flex items-center mb-2 sm:mb-0">
                <User className="h-4 w-4 mr-1" />
                <span>Your personal session library</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  {mySessions.length} session{mySessions.length !== 1 ? "s" : ""} created
                </span>
                <button onClick={() => navigate("/editor")} className="text-blue-600 hover:text-blue-700 font-medium">
                  + Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MySession
