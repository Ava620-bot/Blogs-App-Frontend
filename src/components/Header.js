import React, { useState } from 'react'
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  
  const user = localStorage.getItem('userName');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

const [value, setValue] = useState('');
  return (
    <AppBar position='sticky' sx={{background: "linear-gradient(90deg, rgba(0,36,27,1) 0%, rgba(121,9,70,1) 35%, rgba(0,255,235,1) 100%);"}}>
      <Toolbar>
        <Typography variant='h4' LinkComponent={Link} to='/blogs' cursor='pointer' >
          BlogsApp
        </Typography>
        {isLoggedIn && <Box display='flex' marginLeft='auto' marginRight='auto'>
          <Tabs textColor='inherit' onChange={(e, val) => setValue(val)} value={value}>
            <Tab LinkComponent={Link} to='/blogs' label='All Blogs' />
            <Tab LinkComponent={Link} to='/myblogs' label='My Blogs' />
            <Tab LinkComponent={Link} to='/blogs/add' label='Add Blog' />
          </Tabs>
        </Box>}
       <Box display="flex" marginLeft="auto">
       {!isLoggedIn &&
       <>
         
         <Button LinkComponent={Link} to='/login' variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Login</Button> 
        <Button LinkComponent={Link} to='/signup' variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Signup</Button>
       </>
        
        }
       {isLoggedIn && 
       <>
          
          <p>{user}</p>
          <Button LinkComponent={Link} to='/login' onClick={()=> dispatch(authActions.logout())} variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>
             Logout
          </Button> 
        </> 
          }
       </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;