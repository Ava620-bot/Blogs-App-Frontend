
import './App.css';
import Header from './components/Header';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Blogs from './components/Blogs';
import UserBlog from './components/UserBlog';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import SignUp from './components/SignUp';

function App() {
  const dispatch = useDispatch();
  //now we are grabbing the state from the redux using useSelector hook
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem('userId')){
      dispatch(authActions.login());
    }
  }, [dispatch])
  
  return <React.Fragment>
   
    <header>
      <Header />
    </header>
    <main>
      <Routes>
       { !isLoggedIn ? (<Route path='/login' element={<Login />} />) :
      ( <>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/add' element={<AddBlog />} />
        <Route path='/myblogs' element={<UserBlog />} />
        <Route path='/myblogs/:id' element={<BlogDetail />} />
     
        </>) }
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </main>
  </React.Fragment>
}

export default App;
