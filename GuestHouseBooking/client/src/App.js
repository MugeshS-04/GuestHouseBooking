import React from 'react'
import Navhead from './components/Navhead'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeScreen from './screens/HomeBooking'
import BookingScreen from './screens/BookingScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import AdminScreen from './screens/AdminScreen'
import Landing from './screens/Landing'
import Features from './screens/Features'
import Feedback from './screens/Feedback'
import ContactUsPage from './screens/ContactUsPage'
function App() {
  return (
    <div className='App'>
      <Navhead />
      <BrowserRouter>
        <Routes>
          {/* Use element prop to specify the component */}
          <Route path='/home' element={<HomeScreen />} />

          <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen />} />


          <Route path='/register' element={<RegisterScreen />} />

          <Route path='/login' element={<LoginScreen />} />

          <Route path='/profile' element={<ProfileScreen />} />

          <Route path='/admin' element={<AdminScreen />} />

          <Route path='/' element={<Landing />} />

          <Route path='/features' element={<Features />} />

          <Route path='/feedback' element={<Feedback />} />
          <Route path='/contact' element={<ContactUsPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
