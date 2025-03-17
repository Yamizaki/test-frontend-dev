'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useDeviceDetection, useTouchInteractions } from '@/hooks/useDeviceDetection';

/**
 * Componente Sidebar con comportamiento estándar de sidebar web
 * - En desktop: posicionado a la izquierda, ocupa espacio físico en el layout
 * - En tablet: colapsable a iconos, ocupa espacio físico reducido
 * - En móvil: se convierte en un drawer que se superpone al contenido
 */
const Sidebar = React.memo(function Sidebar({ 
  modulos = [], 
  onSelectModulo, 
  selectedModulo,
  isCollapsed = false,
  toggleCollapse,
  isMobileDrawer = false
}) {
  const [activeGroup, setActiveGroup] = useState(null);
  const { isTouchDevice, isMobile } = useDeviceDetection();
  const touchInteractions = useTouchInteractions();
  
  // Determinar automáticamente el grupo activo basado en el módulo seleccionado
  React.useEffect(() => {
    if (selectedModulo && modulos.length > 0) {
      const moduloNum = selectedModulo.titulo.match(/Módulo (\d+)/i);
      if (moduloNum) {
        setActiveGroup(`MÓDULO ${moduloNum[1]}`);
      }
    }
  }, [selectedModulo, modulos]);

  // Memoizar la agrupación de módulos
  const modulosAgrupados = useMemo(() => {
    return modulos.reduce((acc, modulo) => {
      const moduloNum = modulo.titulo.match(/Módulo (\d+)/i);
      const key = moduloNum ? `MÓDULO ${moduloNum[1]}` : 'OTRO';
      
      if (!acc[key]) {
        acc[key] = [];
      }
      
      acc[key].push(modulo);
      return acc;
    }, {});
  }, [modulos]);

  // Handler optimizado para seleccionar módulo
  const handleModuleSelect = useCallback((modulo) => {
    onSelectModulo(modulo);
  }, [onSelectModulo]);
  
  // Toggle para grupos en móvil
  const toggleGroup = useCallback((groupName) => {
    setActiveGroup(prev => prev === groupName ? null : groupName);
  }, []);
  
  // Clases CSS condicionales
  const sidebarClasses = useMemo(() => {
    // Clases base
    let classes = "bg-gradient-to-b from-gray-800 to-gray-900 text-white h-full overflow-y-auto";
    
    // Si es un drawer móvil, no añadir clases de posición
    if (isMobileDrawer) {
      return classes;
    }
    
    // Si es sidebar normal (no drawer), aplicar clases de posición y tamaño
    classes += " transition-all duration-300";
    
    return classes;
  }, [isMobileDrawer]);
  
  return (
    <aside className={sidebarClasses}>
      {/* Botón de toggle para colapsar/expandir (no en drawer móvil) */}
      {!isMobileDrawer && !isMobile && (
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-24 bg-blue-600 text-white p-1 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
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
      )}
      
      {/* Logo/Branding del sidebar */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gradient">Blockchain</h2>
          <p className="text-xs text-gray-400 mt-1">Plataforma de Aprendizaje</p>
        </div>
      )}
      
      {/* Navegación */}
      <nav className={`${isCollapsed ? 'py-4' : 'p-4'}`}>
        {Object.entries(modulosAgrupados).map(([groupName, modulosList], groupIndex) => {
          // Determinar si este grupo está activo
          const isGroupActive = activeGroup === groupName;
          
          return (
            <div key={groupIndex} className="mb-4">
              {/* Encabezado del grupo - puede ser clickable en móvil */}
              <div 
                className={`
                  ${!isCollapsed ? 'mb-2 px-2 py-1' : 'mb-3 flex justify-center'} 
                  ${isMobileDrawer ? 'cursor-pointer bg-gray-700/30 rounded flex justify-between items-center' : ''}
                `}
                onClick={isMobileDrawer ? () => toggleGroup(groupName) : undefined}
              >
                {!isCollapsed && (
                  <>
                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                      {groupName}
                    </h3>
                    {isMobileDrawer && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform duration-300 ${isGroupActive ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </>
                )}
                {isCollapsed && (
                  <div className="h-6 w-6 flex items-center justify-center bg-gray-700 rounded-full text-xs font-bold">
                    {groupName.replace(/[^\d]/g, '')}
                  </div>
                )}
              </div>
              
              {/* Lista de módulos - en móvil solo se muestra si el grupo está activo */}
              {(!isMobileDrawer || isGroupActive) && (
                <ul className={`space-y-1 ${isCollapsed ? 'px-2' : ''}`}>
                  {modulosList.map((modulo, index) => {
                    // Extraer información del módulo
                    const match = modulo.titulo.match(/Módulo \d+: (.*)/i);
                    const titulo = match ? match[1] : modulo.titulo;
                    const claseNum = index + 1;
                    
                    // Determinar si este módulo está seleccionado
                    const isSelected = selectedModulo === modulo;
                    
                    // Determinar si la clase está completada
                    const isCompleted = modulo.clases && modulo.clases.length > 0 
                      ? modulo.clases[0].completado 
                      : false;
                    
                    // Obtener propiedades de interacción basadas en tipo de dispositivo
                    const interactionProps = touchInteractions.getInteractionProps(
                      () => handleModuleSelect(modulo),
                      {
                        // Clases normales vs hover según dispositivo
                        className: `
                          w-full text-left rounded-lg flex items-center transition-colors
                          ${isCollapsed ? 'justify-center py-3 px-1' : 'py-2 px-3'} 
                          ${isSelected ? 'bg-blue-700 text-white shadow-lg' : 'text-gray-300'}
                        `,
                        // Clase específica para hover en dispositivos no táctiles
                        mouseClass: isSelected ? '' : 'hover:bg-gray-700/50',
                        // Ocultar todo excepto el tooltip en modo colapsado
                        title: isCollapsed ? `Clase ${claseNum}: ${titulo}` : ''
                      }
                    );
                    
                    return (
                      <li key={index}>
                        <button {...interactionProps}>
                          {/* Indicador de estado */}
                          <span className={`
                            flex-shrink-0 h-2 w-2 rounded-full 
                            ${isCompleted ? 'bg-green-500' : 'bg-blue-400'}
                            ${isCollapsed ? 'mx-auto' : 'mr-3'}
                          `}></span>
                          
                          {!isCollapsed && (
                            <>
                              <span className="truncate flex-1">
                                Clase N° {String(claseNum).padStart(2, '0')}
                                {!isMobile && `: ${titulo}`}
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
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Footer del sidebar - solo visible cuando está expandido */}
      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-gray-700 text-xs text-gray-400">
          <p>© 2025 Plataforma Blockchain</p>
          <p className="mt-1">Versión 1.0.0</p>
        </div>
      )}
    </aside>
  );
});

export default Sidebar;