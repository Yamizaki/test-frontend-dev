// src/components/layouts/MobileLayout.jsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

/**
 * Layout específico para dispositivos móviles
 * Implementa un patrón de "drawer navigation" donde el menú se desliza desde la izquierda
 */
export default function MobileLayout({ children, sidebar: Sidebar, modulos, selectedModulo, onSelectModulo }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isPortrait } = useDeviceDetection();
  
  // Prevenir scroll cuando el drawer está abierto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen]);
  
  // Cerrar drawer al cambiar orientación
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [isPortrait]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Header fijo con botón de menú */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={toggleDrawer}
            className="text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isDrawerOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isDrawerOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <div className="text-xl font-bold text-gradient">Blockchain</div>
          
          <div className="flex items-center space-x-2">
            <button className="relative text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>
            
            <button className="bg-red-600 p-2 rounded text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Overlay para cerrar el drawer al hacer tap fuera */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer navigation - slide from left */}
      <div 
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out pt-16 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {Sidebar && (
          <Sidebar 
            modulos={modulos} 
            selectedModulo={selectedModulo} 
            onSelectModulo={(modulo) => {
              onSelectModulo(modulo);
              setIsDrawerOpen(false);
            }}
            isMobileDrawer={true}
          />
        )}
      </div>
      
      {/* Contenido principal */}
      <main className="pt-16 px-4 py-6">
        {children}
      </main>
      
      {/* Bottom navigation para móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-2 py-3 flex justify-around z-40">
        <button className="text-white text-center flex flex-col items-center opacity-80 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Inicio</span>
        </button>
        
        <button className="text-white text-center flex flex-col items-center opacity-80 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xs mt-1">Cursos</span>
        </button>
        
        <button className="text-white text-center flex flex-col items-center opacity-80 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="text-xs mt-1">Guardados</span>
        </button>
        
        <button className="text-white text-center flex flex-col items-center opacity-80 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </nav>
      
      {/* Padding para compensar la navegación inferior */}
      <div className="h-16"></div>
    </div>
  );
}