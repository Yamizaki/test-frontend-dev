// src/components/layouts/ResponsiveLayout.jsx
'use client';

import { useEffect, useState } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

/**
 * Layout responsivo que elige el layout adecuado según el dispositivo
 */
export default function ResponsiveLayout({ children, sidebar, modulos, selectedModulo, onSelectModulo }) {
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();
  const [mounted, setMounted] = useState(false);
  
  // Solucionar problema de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Evitar renderizado durante SSR
  if (!mounted) {
    return <div className="min-h-screen bg-gray-900"></div>;
  }
  
  // Seleccionar el layout adecuado según el tipo de dispositivo
  if (isMobile) {
    return (
      <MobileLayout 
        sidebar={sidebar} 
        modulos={modulos} 
        selectedModulo={selectedModulo} 
        onSelectModulo={onSelectModulo}
      >
        {children}
      </MobileLayout>
    );
  }
  
  return (
    <DesktopLayout 
      sidebar={sidebar} 
      modulos={modulos} 
      selectedModulo={selectedModulo} 
      onSelectModulo={onSelectModulo}
    >
      {children}
    </DesktopLayout>
  );
}