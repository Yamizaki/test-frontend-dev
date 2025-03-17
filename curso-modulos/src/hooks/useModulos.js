// src/hooks/useModulos.js
import useSWR from "swr";
import { getModulos } from "@/services/api";
import { getAuthToken } from "@/utils/auth";

/**
 * Hook para obtener los módulos con caché y revalidación inteligente
 * @param {Object} options Opciones adicionales para SWR
 * @returns {Object} Estado de los módulos con funciones de gestión
 */
export function useModulos(options = {}) {
  const token = getAuthToken();
  const cacheKey = token ? ["modulos", token] : null;

  // La función fetcher envuelve a getModulos para gestionar el token
  const fetcher = async () => {
    if (!token) throw new Error("No hay token de autenticación");
    return getModulos(token);
  };

  // useSWR proporciona caché, revalidación y gestión de estados
  const {
    data: modulos,
    error,
    isValidating,
    mutate,
  } = useSWR(cacheKey, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // No reintentar en errores 4xx
      if (error.status >= 400 && error.status < 500) return;

      // Reintentar hasta 3 veces
      if (retryCount >= 3) return;

      // Incrementar tiempo de espera entre reintentos
      const timeout = Math.min(1000 * 2 ** retryCount, 30000);
      setTimeout(() => revalidate({ retryCount }), timeout);
    },
    ...options,
  });

  // Estado derivado
  const isLoading = !error && !modulos;

  // Obtener un módulo específico por ID
  const getModuloPorIndice = (indice) => {
    if (!modulos || !modulos.length) return null;
    return modulos[indice] || null;
  };

  // Optimistic update para marcar una clase como completada
  const marcarClaseCompletada = async (
    moduloId,
    claseId,
    completado = true
  ) => {
    if (!modulos) return;

    // Crear copia profunda para mutación optimista
    const nuevosModulos = JSON.parse(JSON.stringify(modulos));

    // Encontrar y actualizar la clase
    const modulo = nuevosModulos.find((m) => m.id === moduloId);
    if (modulo && modulo.clases) {
      const clase = modulo.clases.find((c) => c.id === claseId);
      if (clase) {
        clase.completado = completado;

        // Actualizar inmediatamente la UI con mutate (optimistic update)
        mutate(nuevosModulos, false); // No revalidar inmediatamente

        // Aquí iría la llamada a la API para actualizarla en el servidor
        try {
          // await updateClase(token, moduloId, claseId, { completado });
          // Este es un punto donde habría que implementar la API real

          // Revalidar después de la actualización
          mutate();
        } catch (error) {
          // Si hay error, revertir al estado anterior
          mutate(modulos, false);
          throw error;
        }
      }
    }
  };

  return {
    modulos,
    error,
    isLoading,
    isValidating,
    revalidate: mutate,
    getModuloPorIndice,
    marcarClaseCompletada,
  };
}
