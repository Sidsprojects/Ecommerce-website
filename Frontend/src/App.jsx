// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import Footer from './Components/Footer/Footer'
import ProductDetails from "./Components/Card/Productdetails"
import Loader from './Components/Loader/Loader'
import Products from './Components/Card/Products'
import Search from "./Components/Search/Search"
import UserLoginSignup from './Components/User/UserLoginSignup'
import store from "./store"
import { loadUser } from './actions/userAction'
import React from "react";
import { useSelector } from 'react-redux'
import UserOptions from './Components/Navbar/UserOptions'

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Router>
    <Navbar/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route exact path='/' Component={Home}/>
    <Route exact path='/product/:id' Component={ProductDetails}/>
    <Route exact path="/products" Component={Products}/>
    <Route exact path='/Search' Component={Search}/>
    {/* <Route exact path='/sad' Component={Loader}/> */}
    <Route exact path="/login" Component={UserLoginSignup}/>
    </Routes>
    <Footer/>
    </Router>
  )
}

export default App
