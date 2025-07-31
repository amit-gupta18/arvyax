import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaEdit, FaClipboardList, FaUser } from 'react-icons/fa';

const Sidebar = () => {
    const { pathname } = useLocation();
    const token = localStorage.getItem('token');
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/my-sessions', label: 'My Sessions', icon: <FaClipboardList /> },
        { path: '/editor', label: 'New Session', icon: <FaEdit /> },
    ];

    return (
        <div className="h-screen w-60 bg-gray-900 text-white flex flex-col shadow-lg">

            <div className="flex-1 p-4 space-y-2">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all ${pathname === item.path ? 'bg-gray-800 font-semibold' : ''
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
