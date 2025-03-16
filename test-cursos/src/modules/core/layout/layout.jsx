import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { IconSidebarCollapse, IconSidebarExpand } from '../icons/icons'
import { Sidebar } from './sidebar'
import LOGO from '../../../assets/logo.png'
import { Drawer } from '../ui/drawer'

export function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <div className={`transition-all duration-300 ${isSidebarOpen ? ' md:mr-[320px]' : 'mr-0'}`}>

                <header className="bg-white shadow-xs">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex gap-x-3 items-center">
                            <img src={LOGO} className='hidden md:block w-32 mt-2' alt="" />
                            <div className="hidden md:block">|</div>
                            <h1 className=" font-light text-gray-800 ml-2">
                                Desarrollo web completo de cero a experto
                            </h1>
                        </div>

                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isSidebarOpen ? <IconSidebarCollapse className="w-6 h-6 text-gray-600" /> : <IconSidebarExpand className="w-6 h-6 text-gray-600" />}

                        </button>
                    </div>
                </header>

                <div className="flex">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>


            <div
                className={`hidden md:block fixed right-0 top-0 h-full w-[320px] bg-gray-100 shadow-lg transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <Sidebar />
            </div>
            <div className="block md:hidden">
                <Drawer width={375} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
                    <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </Drawer>
            </div>
        </>
    )
}
