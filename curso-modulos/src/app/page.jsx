'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { useModulos } from '@/hooks/useModulos';
import ResponsiveLayout from '@/components/layouts/ResponsiveLayout';
import Sidebar from '@/components/Sidebar';

// Componentes cargados de forma perezosa
const ClaseCard = lazy(() => import('@/components/ClaseCard'));
const VideoPlayer = lazy(() => import('@/components/VideoPlayer'));

// Componentes de carga para Suspense
const LoadingCard = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-blue-500/20 animate-pulse">
    <div className="bg-gray-700 h-48"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="flex justify-end">
        <div className="h-8 w-24 bg-blue-700 rounded"></div>
      </div>
    </div>
  </div>
);

const LoadingVideo = () => (
  <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-blue-500/20 animate-pulse flex items-center justify-center">
    <div className="text-gray-600">Cargando reproductor...</div>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const { isMobile, isTablet, isPortrait } = useDeviceDetection();
  const [selectedModuloIndex, setSelectedModuloIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Obtener módulos con SWR para caché y revalidación
  const { 
    modulos, 
    isLoading, 
    error, 
    getModuloPorIndice
  } = useModulos();
  
  // Módulo seleccionado actual
  const selectedModulo = getModuloPorIndice(selectedModuloIndex);
  
  // Verificar autenticación al cargar
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    // Marcar el componente como montado para evitar problemas de hidratación
    setMounted(true);
  }, [router]);

  // Handler para seleccionar módulo
  const handleSelectModulo = (modulo) => {
    const index = modulos?.findIndex(m => m === modulo) ?? -1;
    if (index !== -1) {
      setSelectedModuloIndex(index);
    }
  };

  // Estados para pantallas de carga y error
  if (!mounted) {
    return <div className="min-h-screen bg-gray-900"></div>;
  }
  
  if (error) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-red-900/30 text-red-300 p-6 rounded-lg max-w-md border border-red-700/50">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error.message || 'Error al cargar los módulos. Por favor, inténtalo de nuevo.'}</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  // Extraer información del módulo seleccionado
  const moduleInfo = (() => {
    if (!selectedModulo) return { title: '', number: '', description: '' };
    
    const title = selectedModulo.titulo || '';
    const match = title.match(/Módulo (\d+)/i);
    const number = match ? match[1] : '';
    const moduleTitle = title.replace(/Módulo \d+:\s*/i, '');
    
    return {
      title: moduleTitle,
      number,
      description: selectedModulo.descripcion || ''
    };
  })();

  // Determinar número de columnas según el dispositivo y orientación
  const gridColumns = (() => {
    if (isMobile) {
      return 1; // Una columna en móvil
    }
    if (isTablet) {
      return isPortrait ? 2 : 3; // 2 columnas en tablet vertical, 3 en horizontal
    }
    return 3; // 3 columnas en desktop por defecto
  })();

  // Contenido principal que se renderiza dentro del layout responsivo
  const mainContent = (
    <>
      {selectedModulo && (
        <div className="container mx-auto">
          <div className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              Clase N° 01: {moduleInfo.title}
            </h1>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-4">MÓDULO {moduleInfo.number}</span>
              <span className="flex items-center text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Curso en progreso
              </span>
            </div>
          </div>
          
          {/* Video Player con lazy loading */}
          <div className="mb-8">
            <Suspense fallback={<LoadingVideo />}>
              <VideoPlayer 
                videoUrl={selectedModulo.clases?.[0]?.video || "https://www.example.com/video.mp4"} 
                thumbnail="/api/placeholder/800/450"
                className="rounded-lg overflow-hidden shadow-lg border border-blue-500/20 w-full"
              />
            </Suspense>
          </div>
          
          {/* Descripción con adaptación a touch */}
          <div className="mb-10 card p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Descripción
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              {moduleInfo.description}
            </p>
          </div>
          
          {/* Clases del módulo con adaptación a tamaño de pantalla */}
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Clases de este módulo
          </h2>
          
          {/* Grid responsivo con suspense para lazy loading */}
          <div className={`grid grid-cols-1 md:grid-cols-${gridColumns} gap-4 md:gap-6`}>
            <Suspense fallback={
              <>
                {Array.from({ length: selectedModulo.clases?.length || 0 }, (_, i) => (
                  <LoadingCard key={i} />
                ))}
              </>
            }>
              {selectedModulo.clases?.map((clase, index) => (
                <ClaseCard 
                  key={index} 
                  clase={clase} 
                  isTouchDevice={isMobile || (isTablet && isPortrait)}
                />
              ))}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );

  // Renderizar dentro del layout responsivo
  return (
    <ResponsiveLayout 
      sidebar={Sidebar}
      modulos={modulos || []}
      selectedModulo={selectedModulo}
      onSelectModulo={handleSelectModulo}
    >
      {mainContent}
    </ResponsiveLayout>
  );
}