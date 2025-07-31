import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MySessions from './components/Mysession'
import SessionEditor from './components/SessionEditor'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Sidebar from './components/Sidebar'


function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/my-sessions"
              element={
                <PrivateRoute>
                  <MySessions />
                </PrivateRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <SessionEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/editor/:id"
              element={
                <PrivateRoute>
                  <SessionEditor />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
