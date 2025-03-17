'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getModulos } from '@/services/api';
import { getAuthToken, isAuthenticated } from '@/utils/auth';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ClaseCard from '@/components/ClaseCard';

export default function HomePage() {
  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Bandera para prevenir llamadas duplicadas
    let isMounted = true;
    
    // Cargar módulos solo una vez
    const fetchModulos = async () => {
      try {
        const token = getAuthToken();
        const data = await getModulos(token);
        
        // Verificar que el componente sigue montado antes de actualizar el estado
        if (isMounted && data && data.length > 0) {
          setModulos(data);
          setSelectedModulo(data[0]); // Seleccionar el primer módulo por defecto
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Error al cargar los módulos. Por favor, inténtalo de nuevo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchModulos();
    
    // Función de limpieza para evitar actualizar el estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, []); // Dependencia vacía para que solo se ejecute al montar el componente

  // Manejar selección de módulo
  const handleSelectModulo = (modulo) => {
    setSelectedModulo(modulo);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/30 text-red-300 p-6 rounded-lg max-w-md border border-red-700/50">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
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

  // Obtener el título de la clase actual si existe
  const currentModuleTitle = selectedModulo?.titulo || '';
  // Extraer el número del módulo
  const moduleMatch = currentModuleTitle.match(/Módulo (\d+)/i);
  const moduleNumber = moduleMatch ? moduleMatch[1] : '';
  
  // Extraer el título después del número de módulo
  const moduleTitle = currentModuleTitle.replace(/Módulo \d+:\s*/i, '');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar superior */}
      <Navbar />
      
      {/* Contenedor principal con sidebar y contenido */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          modulos={modulos} 
          onSelectModulo={handleSelectModulo} 
          selectedModulo={selectedModulo} 
        />
        
        {/* Contenido principal - el margin-left ahora se maneja dinámicamente en el componente sidebar */}
        <main className="p-6 w-full transition-all duration-300">
          {selectedModulo && (
            <div className="container mx-auto">
              <div className="mb-8 border-b border-gray-700 pb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Clase N° 01: {moduleTitle}
                </h1>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-4">MÓDULO {moduleNumber}</span>
                  <span className="flex items-center text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Curso en progreso
                  </span>
                </div>
              </div>
              
              {/* Contenedor de video */}
              <div className="mb-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-blue-500/20 aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-transform hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-10 w-10"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                
                {/* Controles de video simulados */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex items-center">
                  <button className="text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  
                  <div className="flex-1 mx-2">
                    <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-1/4"></div>
                    </div>
                  </div>
                  
                  <span className="text-white text-sm">45:35</span>
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-gray-300">
                  {selectedModulo.descripcion}
                </p>
              </div>
              
              {/* Otras clases del módulo */}
              <h2 className="text-2xl font-bold mb-4">Clases de este módulo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedModulo.clases.map((clase, index) => (
                  <ClaseCard key={index} clase={clase} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}