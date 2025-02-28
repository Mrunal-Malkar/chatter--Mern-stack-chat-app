import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from"./pages/home.jsx"
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import {Routes,Route} from "react-router"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Routes>

  <Route path="/" element={<Home/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/login" element={<Login/>} />
  
  </Routes>
    </>
  )
}

export default App
