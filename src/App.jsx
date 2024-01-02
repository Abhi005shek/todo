import { useContext, useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Header from './pages/Header'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { server, context } from './main'

function App() {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser} = useContext(context);


  useEffect(() => {
  axios.get(`${server}/user/myprofile`,{withCredentials: true}).
  then(res => {
    setUser(res.data.user);
    setIsAuthenticated(true);
  })
  .catch(eroor => {
    setUser({});
    setIsAuthenticated(false)
  } )
  },[])

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
      
    </>
  )
}

export default App
