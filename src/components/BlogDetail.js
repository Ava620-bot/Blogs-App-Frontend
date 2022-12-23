import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles = {mb:1, mt:2, fontSize:'24px', fontWeight:'bold'};

const BlogDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
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
 const[blog, setBlog] = useState();
  const id = useParams().id;  //useParams hook helps us to get the id of blog from the url
  console.log(id); 
  const fetchDetails = async()=>{
    const res = await axios.get(`https://blogs-app-api.onrender.com/api/blog/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInputs({
        title:data.blog.title,
        description:data.blog.description,
      })
    })
  }, [id]); //here whenever the id at the url params will change for every particular blog to edit it will re render the component and useEffect will get that id to call the get fucntion to the backend to fetch the blog details
   console.log(blog);
   const sendRequest = async()=>{
    const res = await axios.put(`https://blogs-app-api.onrender.com/api/blog//update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err))
    const data = await res.data;
    return data;
   }
  return (
    <div>
    {inputs && 
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

          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField margin='normal' variant='outlined' name='description' value={inputs.description} onChange={handleChange}/>
          <Button sx={{mt:2, borderRadius:2}} variant='contained' color='warning' type='submit'>Add</Button>
        </Box>
      </form>
    }
    </div>
  )
}

export default BlogDetail;