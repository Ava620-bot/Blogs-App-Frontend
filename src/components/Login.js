import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  //to update the state at the redux after login and signup we can use another hook dispatch
  const dispatch = useDispatch();
  const [isSignup, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  });
  const sendRequest = async(type="login")=>{
    const res = await axios.post(`https://blogs-app-api.onrender.com/api/user/${type}`, {
      //http://localhost:3000/api
      name: inputs.name,
      email: inputs.email,
      password: inputs.password 
     }).catch((err)=>{
      console.log(err);
     })
     const data = await res.data;
     console.log(data);
     return data;
  }
  const handleChange = (e)=>{
    
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
      //here we are using redux state actions to render the allblogs functinality after user got loggedin or signup using dispatch hook
      sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id)) //getting the user's id from the database and storing it in a global storage of javascript so we if reload page it will not gets away and stays on the browser permanently which can not be achieved using redux state method
      .then(()=>dispatch(authActions.login()))
      .then(() => navigate('/blogs'))
      .then(data=>console.log(data))
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId", data.user._id)) //getting the user's id from the database and storing it in a global storage of javascript so we if reload page it will not gets away and stays on the browser permanently which can not be achieved using redux state method
      .then(()=>dispatch(authActions.login()))
      .then(() => navigate('/blogs'))
      .then(data=>console.log(data));
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
        display="flex" 
        flexDirection={'column'} 
        alignItems='center' 
        justifyContent={'center'}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={'auto'}
        marginTop={5}
        borderRadius={5}
        maxWidth={400}
        >
          <Typography variant='h4' padding={3} textAlign="center">{isSignup ? 'SignUp Page' : 'Login Page'}</Typography>
        {isSignup &&  <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='name' margin='normal' />} 
          <TextField type='email' name="email" onChange={handleChange} value={inputs.email} placeholder='email' margin='normal' />
          <TextField type='password' name="password" onChange={handleChange} value={inputs.password} placeholder='password' margin='normal' />
          <Button type='submit' variant='contained'sx={{borderRadius:3, marginTop:3}} color="warning">{isSignup ? 'SignUp' : 'Login'}</Button>
          <Button onClick={()=>setIsSignUp(!isSignup)} sx={{borderRadius:3, marginTop:3}}>Change to {isSignup ? 'Login' : 'SignUp'}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Login;