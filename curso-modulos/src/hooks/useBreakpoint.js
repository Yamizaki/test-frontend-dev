// src/hooks/useBreakpoint.js
import { useState, useEffect } from "react";

// Definición de breakpoints consistente con Tailwind
const breakpoints = {
  sm: 640, // Móviles grandes
  md: 768, // Tablets
  lg: 1024, // Laptops/Desktops pequeños
  xl: 1280, // Desktops
  "2xl": 1536, // Desktops grandes
};

/**
 * Hook personalizado para detectar breakpoints de manera consistente
 * @returns {Object} Objeto con propiedades booleanas para cada breakpoint y el breakpoint actual
 */
export default function useBreakpoint() {
  // Evitar acceder a window durante SSR
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // Estado que almacena qué breakpoints están activos
  const [breakpointValues, setBreakpointValues] = useState({
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
    current: "", // breakpoint actual
  });

  useEffect(() => {
    // Función para actualizar el tamaño de la ventana
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      // Actualizar qué breakpoints están activos
      setBreakpointValues({
        isSm: width >= breakpoints.sm,
        isMd: width >= breakpoints.md,
        isLg: width >= breakpoints.lg,
        isXl: width >= breakpoints.xl,
        is2xl: width >= breakpoints["2xl"],
        // Determinar el breakpoint actual (el más pequeño que coincide)
        current:
          width < breakpoints.sm
            ? "xs"
            : width < breakpoints.md
            ? "sm"
            : width < breakpoints.lg
            ? "md"
            : width < breakpoints.xl
            ? "lg"
            : width < breakpoints["2xl"]
            ? "xl"
            : "2xl",
      });
    };

    // Set initial values
    if (typeof window !== "undefined") {
      handleResize();

      // Debounced resize handling
      let timeoutId;
      const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 100);
      };

      window.addEventListener("resize", debouncedResize);

      return () => {
        window.removeEventListener("resize", debouncedResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return {
    ...breakpointValues,
    width: windowSize.width,
    height: windowSize.height,
  };
}
