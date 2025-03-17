import { useEffect, useState } from "react";
import { MODULES_URL } from "@/app/constans";
import { useRouter } from 'next/navigation';
import { Modules } from "@/interfaces";
import { useStore } from "@/app/store/globalStore";

export function useModules () {
  const [modules, setModules] = useState<Modules[]>([]);
  const router = useRouter();
  const { setCourseInfo } = useStore()
  
  async function getModules () {
    const token = localStorage.getItem('token');
    const currentModule = localStorage.getItem('current-module');
  
    if (!token) {
      router.push('/login');
      return
    };

    try {
      const response = await fetch(MODULES_URL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        } 
      });

      if (!response.ok) {
        router.push('/login');
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if(!currentModule) setCourseInfo(data[0].clases[0]);
      setModules(data);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
      router.push('/login');
    }
  }
  
  useEffect(() => {
    getModules();
  }, []);

  return { modules }
}