'use client'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const AppContext = createContext(null)
export const AppProvider = ({ children }) => {
  const [classSelected, setClassSelected] = useState({
    completado: false,
    descripcion: "Aprende los fundamentos de HTML.",
    duracion: "30 minutos",
    titulo: "Introducción a HTML",
    video: "https://example.com/fundamentos%de%html"
  })
  return (
    <AppContext.Provider value={{ classSelected, setClassSelected }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext debe usarse dentro de un Provider")
  return context;
}