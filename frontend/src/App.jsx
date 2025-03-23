import { lazy} from 'react'
import {Routes,Route} from "react-router"
import './App.css'

const Home=lazy(()=>import("./pages/home.jsx"))
const Login=lazy(()=>import("./pages/login.jsx"))
const Signup=lazy(()=>import("./pages/signup.jsx"))

function App() {

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
