'use client'

import { useGetLessons } from '@/hooks/lessons'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import LessonSidebar from './LessonSidebar'
import { SidebarInset } from '../ui/sidebar'
import Loader from '../loader/Loader'

type Props = {
  moduleId: string
  classId: string
  children: ReactNode
}

const LessonContainer = ({ moduleId, classId, children }: Props) => {
  const { data, isLoading } = useGetLessons()
  const moduleIndex = parseInt(moduleId) - 1
  const classIndex = parseInt(classId) - 1

  if (isNaN(moduleIndex) || isNaN(classIndex)) {
    return redirect('/')
  }

  if (data === undefined) {
    return null
  }
  const currentClass = data[moduleIndex]?.clases[classIndex]
  if (!currentClass) {
    return redirect('/')
  }

  return (
    <div className='flex w-full'>
      {isLoading && <Loader open={isLoading} />}
      <LessonSidebar
        currentClassId={classIndex.toString()}
        currentModuleId={moduleIndex.toString()}
      />
      <SidebarInset className='p-3 w-full'>{children}</SidebarInset>
    </div>
  )
}

export default LessonContainer
