import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './modules/auth/pages/login-page'
import { PrivateRoute } from './modules/core/layout/private-route'
import { CoursePage } from './modules/course/pages/course-page'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
          <Route
          path="/"
          element={
            <PrivateRoute>
              <CoursePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
