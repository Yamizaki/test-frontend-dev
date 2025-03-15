'use client'
import Loader from '@/components/loader/Loader'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useGetLessons } from '@/hooks/lessons'
import { Check } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { use } from 'react'
import ReactPlayer from 'react-player'
type Props = {
  params: Promise<{ slug: string[] }>
}
const LessonPage = ({ params }: Props) => {
  const { slug } = use(params)
   const [moduleId, classId] = slug

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
    <div className='w-full flex flex-col'>
      {isLoading && <Loader open={isLoading} />}
      <div className='flex flex-row gap-2 items-center'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-3  justify-between w-full'>
          <div className='flex flex-col gap-1'>
            <span className='text-[16px] uppercase text-secondary-foreground/80 font-semibold'>
              Modulo {moduleIndex + 1} &bull; Clase {classIndex + 1} &bull;{' '}
              {currentClass.titulo}
            </span>
            <span className='text-zinc-400 text-xs'>
              {currentClass.duracion}
            </span>
          </div>
          {currentClass.completado && (
            <div className='w-fit h-fit px-3 py-1 md:py-2 rounded-xl text-white bg-teal-700 text-xs flex justify-center md:gap-1 items-center'>
              <Check className='w-3 h-3' />
              Completado
            </div>
          )}
        </div>
      </div>
      <Separator className='my-3 w-full' />
      <div className='px-4 text-foreground/70 text-sm w- full mb-4'>
        <p>{currentClass.descripcion}</p>
      </div>
      <div className='w-full max-w-[1200px] h-[300px] md:h-[500px] px-4 rounded-lg overflow-hidden'>
        <ReactPlayer
          className='rounded-lg'
          url={currentClass.video}
          controls
          width={'100%'}
          height={'100%'}
        />
      </div>
    </div>
  )
}

export default LessonPage
