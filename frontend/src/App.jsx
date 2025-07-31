import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-sessions" element={<MySessions />} />
          <Route path="/session/:id" element={<SessionEditor />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
