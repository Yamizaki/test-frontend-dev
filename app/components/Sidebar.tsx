'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChevronDown, Play, CircleCheckBig, LogOut } from "lucide-react"
import { useStore } from "../store/globalStore"
import type { Modules } from "@/interfaces"
import SidebarSkeleton from "../skeleton/Sidebar"
import { useAuth } from "@/hooks/useAuth"

interface SidebarProps {
  modules: Modules[];
}

export default function SidebarApp ( { modules }: SidebarProps ) {
  const { setCourseInfo } = useStore()
  const { logout } = useAuth()

  if (modules.length === 0) return <Sidebar className="p-3"><SidebarSkeleton /></Sidebar>
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between">
        <span className="font-bold text-2xl">Blockchain</span>
        <button className="bg-red-200 p-1 rounded-md cursor-pointer" onClick={() => logout()}>
          <LogOut />
        </button>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {
          modules?.map((module) => (
            <Collapsible key={module.titulo} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild className="bg-gray-200">
                  <CollapsibleTrigger>
                    {module.titulo}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarMenu className="mt-2">
                    {module.clases.map((clase) => (
                      <SidebarMenuItem key={clase.titulo}>
                        <SidebarMenuButton asChild>
                          <button className="w-full flex justify-between items-center cursor-pointer" onClick={() => setCourseInfo(clase)}>
                            <div className="flex items-center gap-2">
                              <Play className="size-4" />
                              <span className="w-auto">{clase.titulo}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {clase.completado && <CircleCheckBig className="size-4 text-green-500" />}
                              <div className="bg-green-400 text-white px-1.5 rounded-sm max-w-[82px]">{clase.duracion}</div>
                            </div>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))
        }
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
