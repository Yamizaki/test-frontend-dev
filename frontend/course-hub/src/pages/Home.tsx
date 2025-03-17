"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";



export const Home = () => {
  return (
    <>
      <div className="bg-m-purple-bg">
        <header className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-white m-0 text-2xl font-semibold">Courses Hub</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold">Acciones</NavigationMenuTrigger>
                <NavigationMenuContent className="border-none outline-none ">

                  <NavigationMenuLink className="w-48 text-white hover:text-m-purple-bg cursor-pointer">Mi perfil</NavigationMenuLink>
                  <NavigationMenuLink className="w-48 text-white hover:text-m-purple-bg cursor-pointer">Suscripciones</NavigationMenuLink>
                  <NavigationMenuLink className="w-48 text-white hover:text-m-purple-bg cursor-pointer">Cerrar Sesion</NavigationMenuLink>
                  
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
      </div>
    </>
  );
};
