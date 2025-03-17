'use client';

import { useRouter } from 'next/navigation';
import { removeAuthToken } from '@/utils/auth';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md border-b border-blue-500/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">Blockchain</div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors text-sm font-medium"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}