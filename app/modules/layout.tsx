'use client'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useModules } from "@/app/modules/hooks/modules.hook";
import SidebarApp from '../components/Sidebar';


export default function ModulesLayout( { children }: { children: React.ReactNode } ) {
  const { modules } = useModules()
  return (
    <SidebarProvider>
      <SidebarApp modules={modules} />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}
