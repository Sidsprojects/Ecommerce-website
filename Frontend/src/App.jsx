import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import Footer from './Components/Footer'

function App() {

  return (
    <Router>
    <Navbar/>
    <Routes>
    <Route exact path='/' Component={Home}/>
    </Routes>
    <Footer/>
    </Router>
  )
}

export default App
