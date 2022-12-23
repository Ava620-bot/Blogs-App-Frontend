import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardBlog from './CardBlog';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async()=>{
    const res = await axios.get('https://blogs-app-api.onrender.com/api/blog/').catch(err=>console.log(err))
    const data = await res.data; 
    return data;
  }
   useEffect(()=>{
     sendRequest().then((data)=>setBlogs(data.blogs));
   },[])
  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <CardBlog 
        id={blog._id}
        isUser={localStorage.getItem('userId')===blog.user._id}
        title={blog.title}
        imageUrl={blog.imageUrl}
        description={blog.description}
        userName={blog.user.name}
  
        />
      ))}
    </div>
  )
}

export default Blogs;