import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import {context, server} from '../main'
import axios from 'axios';
import toast from 'react-hot-toast'

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(context);
  console.log("isAuthenticated : ",isAuthenticated)

  async function logoutHandler(){
    setLoading(true)
  try{
    const {data} = await axios.get(`${server}/user/logout`,{ withCredentials: true})
  
    console.log(data)
    toast.success(data.message);
    setIsAuthenticated(false);
    setLoading(false)
  }catch(err){
  toast.error(err.response.data.message);
  setIsAuthenticated(true);
  setLoading(false)
  console.log(err);
  }
  
  }

  return (
    <nav>
        <div>
            <h4>TODO App.</h4>
        </div>
        <div className='links'>
        <ul>
        <li><NavLink to="/" className={"navlink"}>Home</NavLink></li>
        <li><NavLink to="/profile" className={"navlink"}>Profile</NavLink></li>
        
        { isAuthenticated ? <li><button disabled={loading} onClick={logoutHandler}>Logout</button></li> : 
        <li><NavLink to="/login" className={"navlink"}>Login</NavLink></li>
        
        }
        </ul>
        </div>
    </nav>
 )
}

export default Header;