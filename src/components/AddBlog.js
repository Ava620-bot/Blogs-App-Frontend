import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const labelStyles = {mb:1, mt:2, fontSize:'24px', fontWeight:'bold'};
function AddBlog() {
  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title:"",
    imageUrl:"",
    description:""
  });
  const sendRequest = async()=>{
    const res = await axios.post('https://blogs-app-api.onrender.com/api/blog/add',{
      title:inputs.title,
      imageUrl:inputs.imageUrl,
      description:inputs.description,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err));
    const data = await res.data;
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
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/myblogs/'));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
        display="flex" 
        flexDirection="column" 
        width={'60%'} 
        border={3} 
        borderColor="gray" 
        borderRadius={5} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3} 
        margin={'auto'}
        marginTop={3}
        marginBottom={3}
        >
          <Typography fontWeight={'bold'} padding={3} color={'gray'} variant='h2' textAlign={'center'} >Post Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField margin='normal' variant='outlined' name='title' value={inputs.title} onChange={handleChange}/>

          <InputLabel sx={labelStyles}>Image</InputLabel>
          <TextField margin='normal' variant='outlined' name='imageUrl' value={inputs.imageUrl} onChange={handleChange}/>

          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField margin='normal' variant='outlined' name='description' value={inputs.description} onChange={handleChange}/>
          <Button sx={{mt:2, borderRadius:2}} variant='contained' color='warning' type='submit'>Add</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog;