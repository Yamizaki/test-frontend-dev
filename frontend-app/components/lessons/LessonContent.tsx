'use client'
import { useGetLessons } from '@/hooks/lessons'
import React from 'react'
import Loader from '../loader/Loader'
import { redirect } from 'next/navigation'

const LessonContent = () => {
  const { data, isLoading } = useGetLessons()
  if (isLoading) {
    return <Loader open={isLoading} />
  }

  if (data !== undefined && !isLoading && data?.length > 0) {
    redirect('/lessons/1/1')
  }
  if (!isLoading && data?.length === 0) {
    return (
      <div className='text-center text-white'>No se encontraron registros</div>
    )
  }
}

export default LessonContent
