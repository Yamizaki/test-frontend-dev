import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './modules/auth/pages/login-page'
import { PrivateRoute } from './modules/core/routes/private-route'
import { CoursePage } from './modules/course/pages/course-page'
import { Layout } from './modules/core/layout/layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >

          <Route index element={<Navigate to="/clases/introducción-a-html" replace />} />

          <Route path="/clases/:course" element={<CoursePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
