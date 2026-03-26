import React from 'react'
import "./landingNav.scss"
import { Navigate, NavLink, useNavigate } from 'react-router'
import { Play } from "lucide-react"
import RouteLinks from './RouteLinks'
import Protected from '../../auth/components/Protected'
import { useAuth } from '../../auth/hooks/useAuth'
const LandingNav = () => {
  const navigate = useNavigate()
  const { user, handleLogout } = useAuth()

  const handleLogoutfun = async () => {
    await handleLogout()
    navigate("/")
  }
  return (
    <div className="navbar">
      <h1> <Play /> MOVIES<span> HUB</span></h1>
      <Protected><RouteLinks /></Protected>
      <div className="btns">
        {user ? (
          <>
            <div className="userBox">
              <img src="https://i.pinimg.com/736x/10/0f/a9/100fa99fa6b7056f45125bac4c70c288.jpg" alt="" />
              <h4>{user.username}</h4>
            </div>
            <button onClick={() => {
              handleLogoutfun()
            }} className='Xl-button'>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => {
              navigate("/login")
            }} className='Xl-button'>Login</button>
            <button onClick={() => {
              navigate("/register")
            }} className='textBlack'>JOIN NOW</button>
          </>
        )}
      </div>
    </div>
  )
}

export default LandingNav
