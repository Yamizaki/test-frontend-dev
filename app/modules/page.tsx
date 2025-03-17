'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { useStore } from '../store/globalStore'
import Video from '../components/LiteComponent'

export default function ModulesPage () {
  const { courseInfo } = useStore()
  const videoId = courseInfo.video?.split('=')[1] ?? ''

  return (
    <main className="w-full h-dvh p-4">
      <SidebarTrigger className='self-auto' />
      <section>
        <Video videoid={videoId} />
        <h1 className="text-3xl font-semibold">{courseInfo.titulo}</h1>
        <p>{courseInfo.descripcion}</p>
      </section>
    </main>
  )
}
