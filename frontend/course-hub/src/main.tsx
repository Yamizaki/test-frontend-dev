import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {CourseApp} from './CourseApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CourseApp />
  </StrictMode>,
)
