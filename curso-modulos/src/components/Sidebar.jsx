'use client';

import { useState, useEffect } from 'react';

export default function Sidebar({ modulos, onSelectModulo, selectedModulo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Detectar cambios en el tamaño de la ventana de manera optimizada
  useEffect(() => {
    // Función debounced para evitar demasiadas actualizaciones
    let timeoutId = null;
    
    const handleResize = () => {
      // Cancelar timeout previo
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Establecer nuevo timeout
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setWindowWidth(width);
        
        // Auto-colapsar el sidebar en pantallas medianas
        if (width < 1024 && width >= 768) {
          setIsCollapsed(true);
        } else if (width >= 1024) {
          setIsCollapsed(false);
        }
      }, 200); // 200ms de debounce
    };

    // Configuración inicial (sin debounce)
    const width = window.innerWidth;
    setWindowWidth(width);
    if (width < 1024 && width >= 768) {
      setIsCollapsed(true);
    } else if (width >= 1024) {
      setIsCollapsed(false);
    }
    
    // Agregar event listener
    window.addEventListener('resize', handleResize);
    
    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Solo se ejecuta al montar el componente

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Agrupar módulos por número de módulo
  const modulosAgrupados = modulos.reduce((acc, modulo) => {
    const moduloNum = modulo.titulo.match(/Módulo (\d+)/i);
    const key = moduloNum ? `MÓDULO ${moduloNum[1]}` : 'OTRO';
    
    if (!acc[key]) {
      acc[key] = [];
    }
    
    acc[key].push(modulo);
    return acc;
  }, {});

  // Determinar el ancho del sidebar
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

  return (
    <>
      {/* Botón para móvil - solo visible en pantallas pequeñas */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-20 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 text-white min-h-screen fixed left-0 top-0 z-40 pt-16
          transform transition-all duration-300 ease-in-out shadow-xl
          ${sidebarWidth} ${
            windowWidth < 768 
            ? isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full' 
            : 'translate-x-0'
          }
        `}
      >
        {/* Botón para colapsar/expandir - visible en tablets y desktop */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-24 bg-blue-600 text-white p-1 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="p-4 overflow-y-auto h-full">
          {/* Botón cerrar para móvil */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden absolute top-4 right-4 text-white"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          {/* Logo/título del sidebar - cambia según si está colapsado */}
          <div className="flex justify-center mb-6">
            {isCollapsed ? (
              <div className="text-2xl font-bold text-white">B</div>
            ) : (
              <div className="text-xl font-bold text-white">Blockchain</div>
            )}
          </div>
          
          <nav className="mt-6">
            {Object.entries(modulosAgrupados).map(([moduloTitle, modulosList], groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {!isCollapsed && (
                  <h3 className="text-lg font-bold text-gray-300 mb-3">{moduloTitle}</h3>
                )}
                <ul className="space-y-2">
                  {modulosList.map((modulo, index) => {
                    // Extraer el número de la clase y el título
                    const match = modulo.titulo.match(/Módulo \d+: (.*)/i);
                    const titulo = match ? match[1] : modulo.titulo;
                    const claseNum = index + 1; // Simulamos un número de clase
                    
                    return (
                      <li key={index}>
                        <button
                          onClick={() => {
                            onSelectModulo(modulo);
                            if (windowWidth < 768) setIsMobileMenuOpen(false);
                          }}
                          className={`
                            w-full text-left rounded flex items-center 
                            ${isCollapsed ? 'justify-center py-3 px-1' : 'py-2 px-3'}
                            ${selectedModulo === modulo 
                              ? 'bg-blue-700 text-white' 
                              : 'text-gray-300 hover:bg-gray-700'}
                            transition-colors
                          `}
                          title={isCollapsed ? `Clase ${claseNum}: ${titulo}` : ''}
                        >
                          <span className={isCollapsed ? 'text-lg' : 'mr-2'}>●</span>
                          
                          {!isCollapsed && (
                            <>
                              <span className="truncate flex-1">
                                Clase N° {String(claseNum).padStart(2, '0')}
                                {windowWidth > 1100 && `: ${titulo}`}
                              </span>
                              <span className="ml-auto text-xs rounded px-1 py-1 bg-green-500">
                                10
                              </span>
                            </>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
      
      {/* Espaciador para empujar el contenido cuando el sidebar está expandido */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${windowWidth >= 768 
          ? isCollapsed 
            ? 'ml-16' 
            : 'ml-64' 
          : 'ml-0'
        }
      `}></div>
    </>
  );
}