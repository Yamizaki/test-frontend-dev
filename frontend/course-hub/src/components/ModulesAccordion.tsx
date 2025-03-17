import {Dispatch} from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLoginStore } from "@/store/useLoginStore";
import { PlayCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { DefaultContent } from '@/types';


export type ModulesAccordionProps = {
    setSelectedContent: Dispatch<React.SetStateAction<DefaultContent>>
}

export const ModulesAccordion = ({setSelectedContent}:ModulesAccordionProps) => {
  const modulos = useLoginStore((state) => state.modulos);

  const handleSelect = ({titulo,video, indice}:DefaultContent) => {
    setSelectedContent({titulo,video, indice})
  }

  return (
    <>
    <Accordion className="space-y-2" type="single" collapsible>
      {modulos &&
        modulos.map((modulo, i) => (
          <AccordionItem className="border-none" value={i.toString()} key={modulo?.titulo}>
            <AccordionTrigger className="text-white font-semibold text-lg cursor-pointer bg-m-purple-bg px-6">{modulo?.titulo}</AccordionTrigger>
            <AccordionContent className="pt-2 pb-0 px-2">
              {
                modulo?.clases.map((clase, i) => (
                    <section 
                        key={clase?.titulo} 
                        className="flex justify-between border-b last:border-b-0 cursor-pointer hover:bg-m-purple-bg-input rounded"
                        onClick={() => handleSelect({titulo: clase.titulo,video: clase.video, indice:i+1})}
                        >
                        <div className="px-6 py-4 flex justify-between items-center w-full gap-4">
                            <div className="flex items-center gap-2">
                                <PlayCircle className="text-white min-w-6 min-h-6"/> 
                                <p className="text-white text-sm">{clase?.descripcion}</p>
                            </div>
                            <Badge className={
                                `${clase?.completado ? 'bg-green-600' : 'bg-orange-800'}`
                            }>
                                {
                                    clase?.completado ? 'Completado' : '100 puntos'
                                }
                            </Badge>
                        </div>
                    </section>
                ))
              }
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
    </>
  );
};
