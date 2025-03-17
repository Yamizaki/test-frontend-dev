// src/constants/responsive.js

/**
 * Constantes para diseño responsivo que se aplicarán en toda la aplicación
 * Estas constantes están alineadas con los breakpoints de Tailwind
 */

// Configuración del sidebar según el breakpoint
export const SIDEBAR_CONFIG = {
  xs: {
    default: "hidden", // El sidebar está oculto por defecto en xs
    width: 0,
    showToggle: true, // Mostrar botón de toggle
    expandable: true, // Puede expandirse a pantalla completa
  },
  sm: {
    default: "hidden", // El sidebar está oculto por defecto en sm
    width: 0,
    showToggle: true,
    expandable: true,
  },
  md: {
    default: "collapsed", // El sidebar está colapsado por defecto en md
    width: 64,
    showToggle: true,
    expandable: true,
  },
  lg: {
    default: "expanded", // El sidebar está expandido por defecto en lg
    width: 256,
    showToggle: true,
    expandable: true,
  },
  xl: {
    default: "expanded", // El sidebar está expandido por defecto en xl
    width: 256,
    showToggle: true,
    expandable: true,
  },
  "2xl": {
    default: "expanded", // El sidebar está expandido por defecto en 2xl
    width: 256,
    showToggle: true,
    expandable: true,
  },
};

// Configuración del grid de tarjetas según el breakpoint
export const GRID_CONFIG = {
  xs: {
    columns: 1, // 1 columna en xs
    gap: 4, // gap pequeño
  },
  sm: {
    columns: 1, // 1 columna en sm
    gap: 4,
  },
  md: {
    columns: 2, // 2 columnas en md
    gap: 5,
  },
  lg: {
    columns: 3, // 3 columnas en lg
    gap: 6,
  },
  xl: {
    columns: 3, // 3 columnas en xl
    gap: 6,
  },
  "2xl": {
    columns: 4, // 4 columnas en 2xl
    gap: 6,
  },
};

// Mapeo de clases Tailwind según breakpoint para contenedores
export const CONTAINER_CLASSES = {
  xs: "px-4 py-3",
  sm: "px-4 py-3",
  md: "px-6 py-4",
  lg: "px-8 py-5",
  xl: "px-10 py-6",
  "2xl": "px-12 py-8",
};

// Mapeo de clases Tailwind según breakpoint para tipografía
export const TYPOGRAPHY_CLASSES = {
  heading1: {
    xs: "text-2xl font-bold",
    sm: "text-2xl font-bold",
    md: "text-3xl font-bold",
    lg: "text-4xl font-bold",
    xl: "text-5xl font-bold",
    "2xl": "text-5xl font-bold",
  },
  heading2: {
    xs: "text-xl font-bold",
    sm: "text-xl font-bold",
    md: "text-2xl font-bold",
    lg: "text-3xl font-bold",
    xl: "text-3xl font-bold",
    "2xl": "text-4xl font-bold",
  },
  paragraph: {
    xs: "text-sm",
    sm: "text-sm",
    md: "text-base",
    lg: "text-base",
    xl: "text-lg",
    "2xl": "text-lg",
  },
};
