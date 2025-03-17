import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { ProtectedLayout } from './ProtectedLayout'
import { NotFound } from '@/pages/NotFound'
import { Logout } from '@/pages/Logout'

export const AppRouter = () => {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />


            {/* Ruta de Logout */}
            <Route path="/logout" element={<Logout />} />

            {/* Rutas para personas autenticadas con el username y pass */}
            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Route>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
  )
}
