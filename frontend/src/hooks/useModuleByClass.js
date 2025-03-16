import { useEffect, useState } from "react"

export const useModuleByClass = (data, title) => {
  const [foundModule, setFoundModule] = useState()
  useEffect(() => {
    if (data && title) setFoundModule(data.find(modulo => modulo.clases.some(clase => clase.titulo === title)))
  }, [data, title])
  return foundModule
}
