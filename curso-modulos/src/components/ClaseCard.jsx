'use client';

import React from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';

// Memoizado para prevenir re-renders innecesarios
const ClaseCard = React.memo(function ClaseCard({ clase }) {
  const breakpoint = useBreakpoint();
  
  // Determinar tamaño de card según breakpoint
  const cardPadding = 
    breakpoint.current === 'xs' ? 'p-3' : 
    breakpoint.current === 'sm' ? 'p-4' : 
    'p-5';
    
  const thumbnailHeight = 
    breakpoint.current === 'xs' ? 'h-36' : 
    breakpoint.current === 'sm' ? 'h-40' : 
    'h-48';
    
  const titleSize = 
    breakpoint.current === 'xs' ? 'text-lg' : 
    breakpoint.current === 'sm' ? 'text-xl' : 
    'text-xl';
  
  return (
    <div className="card transition-transform hover:-translate-y-1 hover:shadow-xl border border-blue-500/20 group">
      {/* Miniatura del video con overlay de play */}
      <div className={`bg-gray-900 ${thumbnailHeight} relative flex items-center justify-center overflow-hidden`}>
        {/* Fondo simulado del video */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 opacity-50"></div>
        
        {/* Miniatura con efecto de hover */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="white" 
            viewBox="0 0 24 24" 
            className="h-16 w-16 opacity-10"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        {/* Botón de play al centro */}
        <div className="relative z-10 bg-blue-600 rounded-full p-3 transform transition-transform group-hover:scale-110 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        {/* Duración en esquina inferior */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded">
          {clase.duracion}
        </div>
        
        {/* Indicador de estado en esquina superior */}
        <div 
          className={`absolute top-2 left-2 text-xs py-1 px-2 rounded-full flex items-center ${
            clase.completado 
              ? 'badge-success' 
              : 'badge-pending'
          }`}
          aria-label={clase.completado ? 'Clase completada' : 'Clase pendiente'}
        >
          <span className="w-2 h-2 rounded-full mr-1.5 bg-current"></span>
          {breakpoint.isSm && (clase.completado ? 'Completado' : 'Pendiente')}
        </div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className={cardPadding}>
        <h3 className={`${titleSize} font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2`}>
          {clase.titulo}
        </h3>
        
        {/* Mostrar descripción solo en pantallas más grandes */}
        {breakpoint.isMd && (
          <p className="text-gray-300 mb-4 text-sm line-clamp-3">{clase.descripcion}</p>
        )}
        
        <div className="flex items-center justify-end mt-3">
          <button 
            className="btn-primary text-sm flex items-center"
            aria-label={`Ver clase: ${clase.titulo}`}
          >
            <span>{breakpoint.isSm ? 'Ver clase' : 'Ver'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ClaseCard;