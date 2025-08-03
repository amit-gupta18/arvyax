import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"

function Header({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAuthenticated = () => {
    if (token) {
      return true
    }
    return false
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
    setUserMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sidebar-toggle p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center ml-4 lg:ml-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <Link to="/" className="text-xl font-bold text-gray-900 tracking-wide">
                Wellnet
              </Link>
            </div>
          </div>


          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/my-sessions"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              My Sessions
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Account</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>


      <div className="lg:hidden border-t border-gray-200">
        <nav className="px-4 py-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/my-sessions"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
          >
            My Sessions
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
