import React,{useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import {context, server} from '../main'
import axios from 'axios';
import toast from 'react-hot-toast'

const Register = () => {

const [name,setname] = useState("");
const [email,setemail] = useState("");
const [password,setpassword] = useState("");
const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(context);

async function submitHandler(e){
    e.preventDefault();
    setLoading(true);
try{
    const {data} = await axios.post(`${server}/user/register`,{
        name,email,password
    },{ headers: {"Content-Type": "application/json"}, withCredentials: true})

    // console.log(data)
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);

 }catch(err){
    setLoading(false);
  toast.error("Something is wrong");
  setIsAuthenticated(false);
  console.log(err);
 }

}

  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className='login'>
        <form onSubmit={submitHandler}>
            <input type="text" required placeholder='Username' value={name} onChange={(e) => setname(e.target.value) }/>
            <input type="email" required placeholder='Email ID' value={email} onChange={(e) => setemail(e.target.value)}/>
            <input type="password" required placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            <button disabled={loading} type="submit">Register</button>
        </form>
        <p>or</p>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
    </div>
  )
}

export default Register