import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import useAuth from './hooks/useAuth.js'
import { Toaster } from 'react-hot-toast'

function App() {
  const { refreshUserDetails } = useAuth();

  useEffect(() => {
    // Fetch user details on app load
    refreshUserDetails();
  }, [refreshUserDetails]);

  return (
    <div className="min-h-screen bg-white">
    <ScrollToTop />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#000000ca',
          color: '#fff',
          fontWeight: '500',
        },
        success: {
          duration: 3000,
          style: {
            background: '#036c4bff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#dc2626',
          },
        },
      }}
    />
   </div>
  )
}

export default App
