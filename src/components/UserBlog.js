import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blogs from './Blogs';
import CardBlog from './CardBlog';

const UserBlog = () => {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState();
  const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:3000/api/blog/user/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
   sendRequest().then((data)=>setUser(data.user));
  }, [user])
  console.log(user);
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index)=>(
        <CardBlog 
        key={index}
        id={blog._id}
        isUser={true}
         title={blog.title}
        imageUrl={blog.imageUrl}
        description={blog.description}
        userName={user.name}
        />
      ))}
    </div>
  )
}

export default UserBlog;