import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${baseUrl}/api/v1/auth/login`, {
                email,
                password,
            })

            const token = res.data.token
            localStorage.setItem('token', token)
            navigate('/dashboard')
            // window.location.href = '/dashboard'

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>

                </form>

                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link className="text-blue-500 hover:underline" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login