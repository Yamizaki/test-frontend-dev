'use client';

import { useRouter } from 'next/navigation';
import { removeAuthToken } from '@/utils/auth';
import { useState, useEffect } from 'react';

export default function Navbar({ isSidebarCollapsed, toggleSidebar }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  
  // Detectar scroll para añadir sombra a la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  return (
    <nav className={`
      bg-gradient-to-r from-gray-900 to-gray-800 
      text-white py-3 px-4 fixed top-0 left-0 right-0 z-50
      transition-all duration-200
      ${scrolled ? 'shadow-lg border-b border-blue-500/20' : ''}
    `}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Botón para toggle del sidebar en pantallas medianas y grandes */}
          <button 
            onClick={toggleSidebar}
            className="hidden md:flex mr-4 text-gray-300 hover:text-white transition-colors"
            aria-label={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
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
          
          {/* Logo con gradiente */}
          <div className="text-2xl font-bold">
            <span className="text-gradient">Blockchain</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="text-gray-300 hover:text-white transition-colors relative">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>
          
          {/* Usuario */}
          <div className="hidden sm:flex items-center text-sm">
            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-2">
              <span className="font-bold">U</span>
            </div>
            <span className="text-gray-300">usuario</span>
          </div>
          
          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
}