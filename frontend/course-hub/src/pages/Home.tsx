"use client";

import { ContentModules } from "@/components/ContentModules";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLoginStore } from "@/store/useLoginStore";
import { useNavigate } from "react-router-dom";



export const Home = () => {

  const logout = useLoginStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate("/login", {replace: true})
  }

  return (
    <>
      <div>     
        <div className="bg-m-purple-bg">
          <header className="px-16 mx-auto py-4 flex justify-between items-center">
            <h1 className="text-white m-0 text-2xl font-semibold">Courses Hub</h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold">Acciones</NavigationMenuTrigger>
                  <NavigationMenuContent className="border-none outline-none ">

                    <NavigationMenuLink className="w-auto text-white hover:text-m-purple-bg cursor-pointer">Mi perfil</NavigationMenuLink>
                    <NavigationMenuLink className="w-auto text-white hover:text-m-purple-bg cursor-pointer">Suscripciones</NavigationMenuLink>
                    <NavigationMenuLink 
                      className="w-auto text-white hover:text-m-purple-bg cursor-pointer"
                      onClick={handleLogout}
                      >
                    Cerrar Sesion
                    </NavigationMenuLink>
                    
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </header>
        </div>
          <ContentModules />
        </div>
    </>
  );
};
