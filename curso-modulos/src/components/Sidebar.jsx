'use client';

import { useState, useEffect } from 'react';

export default function Sidebar({ modulos, onSelectModulo, selectedModulo, isCollapsed, toggleCollapse }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        setWindowWidth(window.innerWidth);
      }, 200); // 200ms de debounce
    };

    // Configuración inicial (sin debounce)
    setWindowWidth(window.innerWidth);
    
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
          bg-gradient-to-b from-gray-800 to-gray-900
          text-white min-h-screen fixed left-0 top-0 z-40 pt-16
          transform transition-all duration-300 ease-in-out
          border-r border-blue-500/10 shadow-xl
          ${sidebarWidth} ${
            windowWidth < 768 
            ? isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full' 
            : 'translate-x-0'
          }
        `}
      >
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
          
          <nav className="mt-6">
            {Object.entries(modulosAgrupados).map(([moduloTitle, modulosList], groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {!isCollapsed && (
                  <h3 className="text-lg font-bold text-gray-300 mb-3 px-3 border-l-2 border-blue-500">
                    {moduloTitle}
                  </h3>
                )}
                <ul className="space-y-2">
                  {modulosList.map((modulo, index) => {
                    // Extraer el número de la clase y el título
                    const match = modulo.titulo.match(/Módulo \d+: (.*)/i);
                    const titulo = match ? match[1] : modulo.titulo;
                    const claseNum = index + 1; // Simulamos un número de clase
                    
                    // Determinar si la clase está completada basado en la primera clase del módulo
                    const isCompleted = modulo.clases && modulo.clases.length > 0 
                      ? modulo.clases[0].completado 
                      : false;
                    
                    return (
                      <li key={index}>
                        <button
                          onClick={() => {
                            onSelectModulo(modulo);
                            if (windowWidth < 768) setIsMobileMenuOpen(false);
                          }}
                          className={`
                            w-full text-left rounded-lg flex items-center 
                            ${isCollapsed ? 'justify-center py-3 px-1' : 'py-2 px-3'}
                            ${selectedModulo === modulo 
                              ? 'bg-blue-700 text-white shadow-lg' 
                              : 'text-gray-300 hover:bg-gray-700/50'}
                            transition-colors
                          `}
                          title={isCollapsed ? `Clase ${claseNum}: ${titulo}` : ''}
                        >
                          {/* Indicador de estado (completado/pendiente) */}
                          <span className={`
                            flex-shrink-0 h-2 w-2 rounded-full 
                            ${isCompleted ? 'bg-green-500' : 'bg-blue-400'}
                            ${isCollapsed ? 'mx-auto' : 'mr-3'}
                          `}></span>
                          
                          {!isCollapsed && (
                            <>
                              <span className="truncate flex-1">
                                Clase N° {String(claseNum).padStart(2, '0')}
                                {windowWidth > 1100 && `: ${titulo}`}
                              </span>
                              <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 font-medium">
                                10 pts
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
          
          {/* Footer del sidebar - solo mostrar cuando está expandido */}
          {!isCollapsed && (
            <div className="mt-auto pt-6 pb-4 px-3 border-t border-gray-700 text-xs text-gray-400">
              <p>© 2025 Plataforma Blockchain</p>
              <p className="mt-1">Versión 1.0.0</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}