"use client";
import { memo, useCallback } from "react";
import { PlaySvg } from "./ui/PlaySvg";
import { CheckSvg } from "./ui/CheckSvg";
import { useAppContext } from "../context/AppContext";

const ItemCard = memo(({ index, ...props }) => {
  const { titulo, duracion, completado } = props
  const { classSelected, setClassSelected } = useAppContext();
  const isSelected = titulo === classSelected.titulo ? "bg-slate-700" : "";

  const handleClick = useCallback(() => {
    setClassSelected(props);
  }, [setClassSelected, titulo]);

  return (
    <li onClick={handleClick} className={`hover:bg-slate-700 ${isSelected} p-3 rounded-md transition-colors cursor-pointer`}>
      <div className="flex gap-3 items-center">
        <div>
          <PlaySvg className="size-6 stroke-emerald-500" />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            Clase N° 0{index} - {titulo}
          </div>
          <span className="text-sm text-white/60">{duracion}</span>
        </div>
        {completado && <CheckSvg className="size-6 stroke-blue-600" />}
      </div>
    </li>
  );
});
ItemCard.displayName = "ItemCard";

const ModuleCard = memo(({ titulo, clases }) => {
  return (
    <div className="flex w-full max-w-md">
      <div className="w-full flex flex-col gap-2">
        <h3 className="uppercase text-white/50 transition-colors text-pretty overflow-hidden text-ellipsis whitespace-nowrap">{titulo}</h3>
        <ul className="flex flex-col gap-1 text-white/80 w-full">
          {clases?.map((item, index) => (
            <ItemCard
              key={item.titulo}
              index={index + 1}
              {...item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});
ModuleCard.displayName = "ModuleCard";

const Sidebar = memo(({ data }) => {
  const renderModuleCard = useCallback(
    (module) => (
      <ModuleCard
        key={module.titulo}
        titulo={module.titulo}
        clases={module.clases}
      />
    ),
    []
  );

  return (
    <aside className="bg-slate-800">
      <section className="px-4 pt-8 md:pb-20 pb-14 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Módulos</h2>
        <div className="flex flex-col gap-4 items-center">
          {data.map(renderModuleCard)}
        </div>
      </section>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";
export default Sidebar;