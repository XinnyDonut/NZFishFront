import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import FishList from './components/fish/FishList'
import FishDetails from './components/fish/FishDetails'
import Layout from './components/Layout'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Login from './components/Login'
import Register from './components/Register'
import authService from './services/auth'

const App = () => {
  const [user,setUser]=useState(null)
  useEffect(() => {
    const user=authService.getUser()
    if(user){
      setUser(user)
    }
  },[])

  const handleLogout = () => {
   authService.logout()
   setUser(null)
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <NavBar user={user} handleLogout={handleLogout} />
      <Hero/>
      <Layout>
        <Routes>
          <Route path="/" element={<FishList />} />
          <Route path="/fish/:id" element={<FishDetails />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />             
          <Route 
            path="/cooking-logs" 
            element={
              <ProtectedRoute>
                <div>Cooking Logs</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;