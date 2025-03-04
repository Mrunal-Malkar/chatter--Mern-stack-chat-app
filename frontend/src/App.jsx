import { lazy, useState } from 'react'
import {Routes,Route} from "react-router"
import './App.css'

const Home=lazy(()=>import("./pages/Home.jsx"))
const Login=lazy(()=>import("./pages/login.jsx"))
const Signup=lazy(()=>import("./pages/signup.jsx"))

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
