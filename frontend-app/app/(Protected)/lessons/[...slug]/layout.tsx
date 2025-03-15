import MainLayout from '@/components/layouts/MainLayout'
import LessonContainer from '@/components/lessons/LessonContainer'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ReactNode, use } from 'react'

export default function LessonLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = use(params)
  const [moduleId, classId] = slug
  return (
    <MainLayout>
      <div className='flex'>
        <SidebarProvider>
          <LessonContainer moduleId={moduleId} classId={classId}>
            {children}
          </LessonContainer>
        </SidebarProvider>
      </div>
    </MainLayout>
  )
}
