import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header could go here */}<Header/>
      <Outlet/>
      {/* Footer could go here */}
      <Footer/>
    </div>
  )
}

export default Layout
