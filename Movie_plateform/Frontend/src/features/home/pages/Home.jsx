import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import MoviesSection from '../../movie/pages/MoviesSection'
import LandingPage from './LandingPage'
import { useAuth } from '../../auth/hooks/useAuth'



const Home = () => {
  const {handleGetMe} = useAuth()
  useEffect(() => {
    
  }, [])
  return (
    <div>
      <Navbar />
      <MoviesSection />
      {/* <LandingPage/> */}
    </div>
  )
}

export default Home
