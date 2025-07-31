import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isAuthenticated = () => {
    if(token) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left: Logo or anything */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/">Wellnet</Link>
        </div>


        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/my-sessions" className="hover:underline">My Sessions</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>


        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <button  className="flex items-center gap-1 hover:underline">
                <FaUserCircle className="text-xl" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
