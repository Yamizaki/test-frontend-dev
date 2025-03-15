import React, { ComponentProps, useMemo } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '../ui/sidebar'
import { useGetLessons } from '@/hooks/lessons'
import { ChevronsUpDown, Loader2, TvMinimalPlay } from 'lucide-react'
import { Collapsible } from '../ui/collapsible'
import {
  CollapsibleContent,
  CollapsibleTrigger
} from '@radix-ui/react-collapsible'
import Link from 'next/link'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils'

type Props = {
  currentClassId: string
  currentModuleId: string
} & ComponentProps<typeof Sidebar>

const LessonSidebar = ({
  currentClassId,
  currentModuleId,
  ...props
}: Props) => {
  const { data, isLoading } = useGetLessons()

  const responseData = useMemo(() => {
    if (data !== undefined) {
      return data
    }
    return []
  }, [data])

  return (
    <Sidebar {...props} className='h-full '>
      <SidebarHeader>
        <h3 className=' px-2 font-bold uppercase'>{'Contenido del curso'}</h3>
        <div className='h-2'></div>
      </SidebarHeader>
      {isLoading && (
        <div>
          {' '}
          <Loader2 className='w-10 h-10 animate-spin text-primary' />
        </div>
      )}
      {!isLoading && responseData.length > 0 && (
        <SidebarContent className='px-4'>
          <SidebarMenu>
            {responseData.map((lesson, indexLesson) => (
              <Collapsible
                key={indexLesson}
                className='group/collapsible'
                defaultOpen
              >
                <CollapsibleTrigger asChild>
                  <div className='flex justify-between items-center hover:cursor-pointer'>
                    <span className='text-[11px] uppercase font-bold text-start'>
                      {lesson.titulo}
                    </span>
                    <ChevronsUpDown className='h-4 w-4' />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroup key={indexLesson}>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {lesson.clases.map((clase, indexClass) => (
                          <SidebarMenuItem key={indexClass}>
                            <Link
                              href={`/lessons/${indexLesson + 1}/${
                                indexClass + 1
                              }`}
                            >
                              <div
                                className={cn(
                                  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-[13px] h-fit ',
                                  {
                                    'bg-zinc-200':
                                      parseInt(currentClassId) === indexClass &&
                                      parseInt(currentModuleId) === indexLesson
                                  }
                                )}
                              >
                                <div className='flex gap-2 items-start w-full'>
                                  <Checkbox
                                    checked={clase.completado}
                                    disabled
                                  />
                                  <div className='flex flex-col gap-2'>
                                    <span
                                      className={cn('font-semibold', {
                                        'text-teal-700':
                                          parseInt(currentClassId) ===
                                            indexClass &&
                                          parseInt(currentModuleId) ===
                                            indexLesson
                                      })}
                                    >
                                      {clase.titulo}
                                    </span>
                                    <div className='flex items-center text-xs text-zinc-500'>
                                      <TvMinimalPlay className='w-4 h-4 mr-1 ' />
                                      {clase.duracion}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarContent>
      )}
    </Sidebar>
  )
}

export default LessonSidebar
