import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {

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
