import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import History from "./pages/History";


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/history' element = {<History/>}/>
    </Routes>
    </>
  )
}

export default App
