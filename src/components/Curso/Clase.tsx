import type { clasesModulo } from "@/types";

interface Props {
	clase: clasesModulo;
	onClick?: () => void;
}

export default function Clase({ clase, onClick }: Props) {
	return (
		<button onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} className='flex justify-between text-sm lg:text-base bg-slate-900 hover:bg-slate-700 w-full p-1 lg:p-2 duration-500 cursor-pointer'>
			<div>
				{clase.completado ? "✅" : "❌"}
				{clase.titulo}
			</div>
			<span className="flex py-0.5 px-1 lg:px-2 rounded bg-slate-300 text-slate-950 font-bold text-xs lg:text-sm">
				{clase.duracion}
			</span>
		</button>
	);
}