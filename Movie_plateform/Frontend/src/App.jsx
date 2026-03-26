import React from 'react'
import "./features/shared/style/global.scss"
import { RouterProvider } from 'react-router'
import { appRouter } from './app.routes.jsx'
import { AuthContext, AuthProvider } from './features/auth/auth.context.jsx'
import { MovieContextProvider } from './features/movie/movie.context.jsx'


const App = () => {
  return (
    <AuthProvider>
      <MovieContextProvider>

        <RouterProvider router={appRouter} ></RouterProvider>
      </MovieContextProvider>
    </AuthProvider>
  )
}

export default App
