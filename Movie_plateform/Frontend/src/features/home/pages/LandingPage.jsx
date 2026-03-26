import React from 'react'
import "../style/landing.scss"
import LandingNav from '../components/LandingNav'
import ImageChanger from '../components/ImageChanger'
import LandingSec1 from '../components/LandingSec1'
import LandingSec2 from '../components/LandingSec2'
import LandingBottom from '../components/LandingBottom'
import Protected from '../../auth/components/Protected'
import MoviesSection from '../../movie/pages/MoviesSection'

const LandingPage = () => {
  return (
    <main className='LandingPage'>
        <LandingNav/>
        <ImageChanger/>
        <LandingSec1/>
        <LandingSec2/>
        {/* <LandingBottom/> */}
        <Protected><MoviesSection/></Protected>
        <LandingBottom/>
    </main>
  )
}

export default LandingPage
