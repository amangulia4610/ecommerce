import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import useAuth from './hooks/useAuth.js'

function App() {
  const { refreshUserDetails } = useAuth();

  useEffect(() => {
    // Fetch user details on app load
    refreshUserDetails();
  }, [refreshUserDetails]);

  return (
    <div className="min-h-screen bg-white">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
   </div>
  )
}

export default App
