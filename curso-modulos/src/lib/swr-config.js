// src/lib/swr-config.js
/**
 * Configuración global para SWR
 */
export const SWR_CONFIG = {
  revalidateOnFocus: false, // No revalidar al enfocar la ventana
  revalidateOnReconnect: true, // Revalidar al reconectar
  refreshInterval: 0, // No refrescar automáticamente
  shouldRetryOnError: true, // Reintentar en caso de error
  dedupingInterval: 2000, // Deduplicar solicitudes en 2 segundos
  focusThrottleInterval: 5000, // Limitar revalidaciones a 5 segundos
  loadingTimeout: 3000, // Timeout para considerar una carga lenta
  errorRetryInterval: 5000, // Esperar 5 segundos antes de reintentar tras error
  errorRetryCount: 3, // Número máximo de reintentos
  suspense: false, // No usar React Suspense por defecto
  use: [], // Middlewares adicionales
};
