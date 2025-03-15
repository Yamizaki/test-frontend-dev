'use client'

import { redirect } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState, useTransition } from 'react'
import React, { ReactNode } from 'react'
import Loader from '../loader/Loader'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore((state) => state.token)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && token) {
      startTransition(() => {
        redirect('/')
      })
    }
  }, [token, isHydrated])

  if (!isHydrated) return null

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-black to-primary grid place-content-center relative overflow-hidden'>
      <div className='absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#fff_10%,transparent_100%)] pointer-events-none' />
      {children}
      {(isPending) && <Loader open={isPending} />}
    </div>
  )
}

export default AuthLayout
