import type { ResponseCursoData, clasesModulo } from "@/types";
import Clase from "./Clase";
import { useState } from "react";

interface Props {
	modulo: ResponseCursoData;
	onClaseClick?: (clase: clasesModulo) => void;
}

export default function Modulo({ modulo, onClaseClick }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e: React.MouseEvent) => { e.stopPropagation(); setIsOpen(!isOpen); };

	return (
		<div className='duration-500 w-full border-b-2 border-t-2 text-neutral-50 bg-slate-950 group hover:bg-slate-800 border-slate-500 cursor-pointer'>
			<div onClick={handleClick} className='flex justify-between items-center text-sm lg:text-base p-3 lg:p-6 gap-2'>
				<h2>{modulo.titulo}</h2>
				<img src='/flecha_Abajo.svg' alt='expandir' width={16} height={16} className={`w-3 h-3 lg:w-4 lg:h-4 duration-500 group-hover:scale-125 ${isOpen ? "rotate-180" : "rotate-0"}`} />
			</div>
			<div className={`overflow-hidden transition-max-height duration-300 ${isOpen ? "max-h-[500px] py-2" : "max-h-0"}`}>
				{
					modulo.clases.map((clase, claseIndex) => (
						<Clase key={claseIndex} clase={clase} onClick={() => onClaseClick && onClaseClick(clase)}
						/>
					))
				}
			</div>
		</div>
	);
}