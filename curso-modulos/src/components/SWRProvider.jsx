// src/components/SWRProvider.jsx
'use client';

import { SWRConfig } from 'swr';
import { SWR_CONFIG } from '@/lib/swr-config';

/**
 * Proveedor de SWR para configuración global
 */
export default function SWRProvider({ children }) {
  return (
    <SWRConfig value={SWR_CONFIG}>
      {children}
    </SWRConfig>
  );
}