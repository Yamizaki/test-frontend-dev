'use client'
import  { useState } from 'react'
import { fetchModules, getToken } from "../lib/fetchModules"
import { Loader } from './ui/Loader'
const Login = ({ callback }) => {
  const [formData, setFormData] = useState({ username: "usuario", password: "contraseña" })
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const token = await getToken(formData)
      const data = await fetchModules(token)
      callback(data)
    } catch (e) { alert("Datos incorrectos"); throw e; }
    finally { setIsLoading(false) }
  }
  return (
    <div style={{height:"calc(100dvh - 52px)"}} className="flex flex-col items-center justify-center max-h-[900px] px-2 animate-fade-in-scale will-change-transform">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input name='username' onChange={handleChange} type="text" defaultValue="usuario" className="bg-gray-300 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150" placeholder="Usuario" />
          <input name='password' onChange={handleChange} type="password" defaultValue="contraseña" className="bg-gray-300 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150" placeholder="Contraseña" />
          <div className="flex flex-col flex-wrap">
            <span className="text-sm text-blue-400 hover:underline text-start">¿Olvidaste tu contraseña?</span>
            <p className="mt-3"> ¿ No tienes una cuenta ? <span className="text-sm text-blue-400 -200 hover:underline mt-4">Regístrate</span></p>
          </div>
          <button type="submit" className="bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 text-white font-bold h-10 px-4 rounded-md mt-4 from-indigo-600 to-blue-600 transition-colors ease-in-out duration-300 cursor-pointer">
            {isLoading ? <Loader size="12px" /> : <span>Login</span>}
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login;