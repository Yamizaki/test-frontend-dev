// src/hooks/useClases.js
import useSWR from "swr";
import { useModulos } from "./useModulos";

/**
 * Hook para trabajar con las clases de un módulo específico
 * @param {String|Number} moduloId ID del módulo
 * @returns {Object} Estado de las clases con funciones de gestión
 */
export function useClases(moduloIndice) {
  const {
    modulos,
    isLoading: isLoadingModulos,
    error: modulosError,
    marcarClaseCompletada,
  } = useModulos();

  // Obtener las clases del módulo seleccionado con revalidación derivada
  const { data: clases, error: clasesError } = useSWR(
    // Clave de cache que depende de los módulos y el índice
    modulos ? ["clases", moduloIndice] : null,
    // Función para extraer las clases del módulo
    () => {
      if (!modulos || moduloIndice === undefined || moduloIndice === null) {
        return [];
      }

      const modulo = modulos[moduloIndice];
      return modulo?.clases || [];
    },
    {
      revalidateIfStale: false, // No revalidar si los datos son antiguos
      revalidateOnFocus: false, // No revalidar al enfocar
      revalidateOnReconnect: false, // No revalidar al reconectar
    }
  );

  const isLoading = isLoadingModulos || (!clases && !clasesError);
  const error = modulosError || clasesError;

  // Obtener una clase específica por índice
  const getClasePorIndice = (indice) => {
    if (!clases || !clases.length) return null;
    return clases[indice] || null;
  };

  // Calcular estadísticas de las clases
  const estadisticas = useSWR(
    clases ? ["estadisticas", clases.length] : null,
    () => {
      if (!clases || !clases.length)
        return { total: 0, completadas: 0, porcentaje: 0 };

      const total = clases.length;
      const completadas = clases.filter((clase) => clase.completado).length;

      return {
        total,
        completadas,
        porcentaje: total > 0 ? Math.round((completadas / total) * 100) : 0,
      };
    }
  );

  // Función para marcar una clase como completada/incompleta, delegada al hook useModulos
  const toggleClaseCompletada = async (claseId, completado) => {
    if (!modulos || moduloIndice === undefined || moduloIndice === null) return;

    const modulo = modulos[moduloIndice];
    if (!modulo) return;

    return marcarClaseCompletada(modulo.id, claseId, completado);
  };

  return {
    clases,
    isLoading,
    error,
    getClasePorIndice,
    estadisticas: estadisticas.data || {
      total: 0,
      completadas: 0,
      porcentaje: 0,
    },
    toggleClaseCompletada,
  };
}
