import React from 'react'
import Skills from './components/Skills'
import Projects from './components/Projects'
import { Route, Routes } from 'react-router-dom'
import AdminRegister from './Pages/AdminRegister'
import AdminLogin from './Pages/AdminLogin'
import Dashboard from './Pages/Dashboard'
import LandingPage from './components/LandingPage'
import Experience from './components/Experience'
import Footer from './components/Footer'
import UserDetails from './Pages/UserDetails'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element=<div>

          <LandingPage/>
          <Projects />
          <Skills />
          <Experience/>
          <Footer/>

        </div> />
        <Route path='/admin/register' element={<AdminRegister />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/post-yourself' element={<UserDetails />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App