import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to Wellnet</h1>
        <p className="text-lg text-gray-600 mb-6">Manage and publish your wellness sessions effortlessly.</p>
        
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
