import type { ResponseCursoData, clasesModulo } from "@/types";
import { useState } from "react";
import Modulo from "./Curso/Modulo";

interface Props {
  curso: Array<ResponseCursoData>;
}

export default function GridModulo({ curso }: Props) {
  const [selectedClase, setSelectedClase] = useState<clasesModulo | null>(() => {
    if (curso.length > 0 && curso[0].clases && curso[0].clases.length > 0) {
      return curso[0].clases[0];
    }
    return null;
  });

  const handleClaseClick = (clase: clasesModulo) => {
    setSelectedClase(clase);
  };
  return (
    <div className="grid grid-cols-12 gap-2 px-5 w-full">
      <div className="col-span-12 md:col-span-7 lg:col-span-8">
        <div className="p-4 rounded-md shadow-md flex flex-col gap-6">
          <div className="mt-4">
            {selectedClase && (
              <video controls className="w-full">
                <source src={selectedClase.video} type="video/mp4" />
              </video>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {selectedClase ? selectedClase.titulo : "Selecciona una clase"}
            </h1>
            <p className="text-gray-500">
              {selectedClase ? selectedClase.descripcion : "Por favor, selecciona una clase para ver su descripción"}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-slate-950 overflow-y-auto h-[450px]">
        <div className="p-4 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold">Módulos</h1>
          <div className="mt-4">
            {curso.map((modulo, index) => (
              <Modulo
                key={index}
                modulo={modulo}
                onClaseClick={handleClaseClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}