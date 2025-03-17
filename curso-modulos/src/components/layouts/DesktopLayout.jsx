// src/components/layouts/DesktopLayout.jsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

/**
 * Layout específico para desktop y tablets
 * Implementa un sidebar fijo que puede colapsarse y expandirse
 */
export default function DesktopLayout({ children, sidebar: Sidebar, modulos, selectedModulo, onSelectModulo }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isTablet } = useDeviceDetection();
  
  // En tablets, colapsar por defecto
  useEffect(() => {
    setIsCollapsed(isTablet);
  }, [isTablet]);
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Navbar superior */}
      <Navbar isSidebarCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        {/* Sidebar - posición fija */}
        <div className={`fixed left-0 top-0 h-full z-30 pt-16 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
          {Sidebar && (
            <Sidebar 
              modulos={modulos} 
              selectedModulo={selectedModulo} 
              onSelectModulo={onSelectModulo}
              isCollapsed={isCollapsed}
              toggleCollapse={toggleSidebar}
            />
          )}
        </div>
        
        {/* Contenido principal - ajusta el margen según el estado del sidebar */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} p-6 pt-24`}>
        {children}
        </main>
      </div>
    </div>
  );
}
