
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '../styles/base.css'
import '../styles/layout.css'
import '../styles/components.css'
import '../components/ui/LampEffect/lamp.css'
import '../styles/responsive.css'

import '../pages/Home/home.css'
import '../pages/Projects/projects.css'
import '../pages/Athletic/athletics.css'
import '../pages/Resume/resume.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
)
