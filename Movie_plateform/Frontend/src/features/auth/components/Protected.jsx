import React, { useEffect } from 'react'
import {useAuth} from "../hooks/useAuth"
import { Navigate, useNavigate } from 'react-router'
const Protected = ({children}) => {
    const { user , loading ,handleGetMe } = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        handleGetMe()
    },[])

    if(loading){
        return(
                <h1 style={{textAlign:"center",fontSize:"0.8rem"}}>Loading...</h1>
        )
    }
    if(!user){
        // return 
        return null
    }


  return (
    children
  )
}

export default Protected
