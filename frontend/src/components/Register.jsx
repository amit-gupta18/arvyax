import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${baseUrl}/api/v1/auth/register`, {
                email,
                password
            });

            if (res.status === 200) {
                alert("Registered successfully!");
            } else {
                alert(res.data.message || "Registration failed");
            }
            setEmail('');
            setPassword('');
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');

        } catch (err) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Register
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
