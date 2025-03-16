'use client'
import { useEffect, useState } from 'react'
import { AppProvider } from "../context/AppContext"
import Cookies from 'js-cookie'
import { fetchModules } from '../lib/fetchModules'
import dynamic from 'next/dynamic'
const Login = dynamic(() => import("../components/Login"), { ssr: false, loading: () => (<div className='h-dvh w-full'></div>) });
const VideoPlayer = dynamic(() => import("../components/VideoPlayer"), { ssr: false, loading: () => (<div className='h-dvh w-full'></div>) });
const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false, loading: () => (<div className='h-dvh w-full' />) });
const LogoutButton = dynamic(() => import("../components/LogoutButton"), { ssr: false });

export const Content = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = Cookies.get('access_token')
    if (token) {
      fetchModules(token)
        .then((data) => {
          setData(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching modules:", error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])
  if (loading) return <div className='h-dvh w-full'></div>
  const callback = (value) => setData(value)
  return (
    <AppProvider>
      {
        !data.length ? <Login callback={callback} /> :
          <>
            <LogoutButton />
            <div className="flex max-xl:flex-col min-h-min text-white flex-1">
              <main className="flex-1">
                <VideoPlayer data={data} />
              </main>
              <Sidebar data={data} />
            </div>
          </>
      }
    </AppProvider>
  )
}
