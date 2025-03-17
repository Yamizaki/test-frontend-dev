import { useState } from "react"
import { ModulesAccordion } from "./ModulesAccordion"
import { useLoginStore } from "@/store/useLoginStore"
import ReactPlayer from 'react-player'
import { DefaultContent } from "@/types"


export const ContentModules = () => {

    const modulos = useLoginStore(state => state.modulos)


    // Tomamos el primer elemento de nombre o video
    const defaultVideo = modulos?.flatMap(modulo => 
        modulo?.clases.map(clase => clase.video)
      )[0] || '';

    const defaultTitulo = modulos?.flatMap(modulo => 
        modulo?.clases.map(clase => clase.titulo)
      )[0] || '';

    const [selectedContent, setSelectedContent] = useState<DefaultContent>({
        titulo: defaultTitulo,
        video: defaultVideo,
        indice: 1
    })


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[calc(100vh-68px)]">
        <div className="col-span-1 lg:col-span-8  font-semibold text-xl ">
            <h3 className="text-center py-4 border-b-2 border-m-purple-bg">Clase 0{selectedContent.indice}: {selectedContent.titulo}</h3>
            {selectedContent ? (
                <div className="video-container">
                    <ReactPlayer url={selectedContent.video} controls width="100%" height="100%" />
                </div>
            ) : (
            <p>Seleccione una clase para ver el video.</p>
            )}
        </div>
        <div className="lg:col-span-4 bg-m-purple-bg-input-hover p-4 h-full overflow-y-auto min-h-[500px] md:min-h-auto">
            <h2 className="text-center text-white font-semibold text-xl pb-4">Frontend Developer</h2>
            <ModulesAccordion 
                setSelectedContent = {setSelectedContent}
            />
        </div>
    </div>
  )
}
