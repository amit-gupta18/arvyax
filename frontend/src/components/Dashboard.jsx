import { useEffect, useState } from "react"
import axios from "axios"
import { Calendar, Tag, ExternalLink, Users, Clock, FileText } from "lucide-react"
import Loader from "./Loader"

function Dashboard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const [publishedSessions, setPublishedSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")

  const isAuthenticated = () => {
    if (token) {
      return true
    }
    return false
  }

  useEffect(() => {
    const fetchPublishedSessions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/sessions`)
        const sessions = response.data.sessions || []
        setPublishedSessions(sessions)
      } catch (error) {
        console.error("Error fetching published sessions:", error)
        if (error.response?.status === 401) {
          window.location.href = "/login"
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPublishedSessions()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Loading sessions...</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Published Sessions</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and join exciting sessions from our community
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{publishedSessions.length} Sessions Available</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated Recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {publishedSessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sessions Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are no published sessions available at the moment. Check back later for new sessions to join.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {publishedSessions.map((session) => (
              <div
                key={session._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {session.title}
                      </h2>
                    </div>
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
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
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
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="border-t cursor-pointer border-gray-100 pt-4">
                    <a
                      href={session.jsonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 group"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Session Details
                      <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {publishedSessions.length > 0 && (
        <div className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
              <div className="flex items-center mb-2 sm:mb-0">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span>
                  Showing {publishedSessions.length} of {publishedSessions.length} sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
