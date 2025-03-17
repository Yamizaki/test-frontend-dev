import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { toast } from 'sonner';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        return data.access_token
      } else {
        toast.error(data.msg ? data.msg : 'Hubo un error al iniciar sesión');
        return null
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    router.push('/login');
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('current-module');
  };

  return {
    token,
    login,
    logout
  };
}