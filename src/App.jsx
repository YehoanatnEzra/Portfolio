import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Athletic from './pages/Athletic'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/projects" element={<Projects/>} />
      <Route path="/athletic" element={<Athletic/>} />
      <Route path="*" element={<Home/>} />
    </Routes>
  )
}
