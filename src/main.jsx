import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/lamp.css'
import './styles/home.css'
import './styles/projects.css'
import './styles/athletics.css'
import './styles/resume.css'
import './styles/responsive.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
