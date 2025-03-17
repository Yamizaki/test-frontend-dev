// src/hooks/useDeviceDetection.js
import { useState, useEffect } from "react";

/**
 * Hook para detectar si el dispositivo es táctil y otras características del dispositivo
 * @returns {Object} Información sobre el dispositivo
 */
export function useDeviceDetection() {
  const [device, setDevice] = useState({
    isTouchDevice: false,
    isPortrait: true,
    isLandscape: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    hasMouse: false,
    prefersDarkMode: false,
  });

  useEffect(() => {
    // Función para detectar dispositivos táctiles
    const detectTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    // Función para detectar orientación
    const detectOrientation = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      return {
        isPortrait,
        isLandscape: !isPortrait,
      };
    };

    // Función para detectar tipo de dispositivo basado en user agent y tamaño
    const detectDeviceType = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();

      const isMobileByUA =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        );
      const isTabletByUA = /ipad|android(?!.*mobile)/i.test(userAgent);

      // Combinamos detección por UA con detección por tamaño para mayor precisión
      const isMobile = isMobileByUA || width < 768;
      const isTablet = isTabletByUA || (width >= 768 && width < 1024);
      const isDesktop = width >= 1024;

      return { isMobile, isTablet, isDesktop };
    };

    // Detectar si hay mouse
    const detectMouse = () => {
      return window.matchMedia("(pointer: fine)").matches;
    };

    // Detectar preferencia de modo oscuro
    const detectDarkMode = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    // Configuración inicial
    const updateDeviceInfo = () => {
      const orientation = detectOrientation();
      const deviceType = detectDeviceType();

      setDevice({
        isTouchDevice: detectTouchDevice(),
        ...orientation,
        ...deviceType,
        hasMouse: detectMouse(),
        prefersDarkMode: detectDarkMode(),
      });
    };

    // Ejecutar la detección inicial
    updateDeviceInfo();

    // Configurar listeners para cambios
    const orientationHandler = () => {
      const orientation = detectOrientation();
      setDevice((prev) => ({ ...prev, ...orientation }));
    };

    const resizeHandler = () => {
      const deviceType = detectDeviceType();
      setDevice((prev) => ({ ...prev, ...deviceType }));
    };

    const darkModeHandler = (e) => {
      setDevice((prev) => ({ ...prev, prefersDarkMode: e.matches }));
    };

    // Añadir event listeners
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", orientationHandler);

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addEventListener("change", darkModeHandler);

    // Limpieza
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", orientationHandler);
      darkModeMediaQuery.removeEventListener("change", darkModeHandler);
    };
  }, []);

  return device;
}

/**
 * Hook personalizado para manejar eventos táctiles vs mouse
 * @returns {Object} Objeto con métodos para eventos táctiles y mouse
 */
export function useTouchInteractions() {
  const { isTouchDevice } = useDeviceDetection();

  // Proporcionar diferentes handlers según el tipo de dispositivo
  return {
    // Para elementos que deberían tener comportamiento diferente en touch vs mouse
    getInteractionProps: (clickHandler, options = {}) => {
      if (isTouchDevice) {
        // En dispositivos táctiles, usamos eventos táctiles
        return {
          onTouchStart: options.useTouch ? clickHandler : undefined,
          onClick: !options.useTouch ? clickHandler : undefined,
          className: `${options.className || ""} ${
            options.touchClass || ""
          }`.trim(),
          style: {
            ...options.style,
            // Eliminar hover en dispositivos táctiles si se especifica
            ...(!options.keepHover && { cursor: "pointer" }),
          },
        };
      } else {
        // En dispositivos no táctiles, usamos eventos de mouse
        return {
          onClick: clickHandler,
          className: `${options.className || ""} ${
            options.mouseClass || ""
          }`.trim(),
          style: options.style,
        };
      }
    },

    // Para saber si aplicar efectos hover
    isTouchDevice,

    // Función para crear clases condicionales para hover
    getHoverClass: (regularClass, hoverClass) => {
      return isTouchDevice ? regularClass : `${regularClass} ${hoverClass}`;
    },
  };
}

/**
 * Hook para manejar la orientación del dispositivo
 * @returns {Object} Información y handlers para orientación
 */
export function useOrientation() {
  const { isPortrait, isLandscape } = useDeviceDetection();

  // Clases condicionales basadas en orientación
  const getOrientationClass = (portraitClass, landscapeClass) => {
    return isPortrait ? portraitClass : landscapeClass;
  };

  return {
    isPortrait,
    isLandscape,
    getOrientationClass,
  };
}
