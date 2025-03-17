'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';
import { setAuthToken } from '@/utils/auth';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      if (data.access_token) {
        setAuthToken(data.access_token);
        router.push('/');
      } else {
        setError('Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.msg || 
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-blue-500/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Plataforma de Cursos
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm bg-red-900/40 p-3 rounded border border-red-700">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 px-4 rounded-md font-medium text-white
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
              transition-all duration-200
            `}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          
          <div className="text-sm text-center text-gray-400 mt-4">
            Pista: Usuario "usuario", Contraseña "contraseña"
          </div>
        </form>
      </div>
    </div>
  );
}