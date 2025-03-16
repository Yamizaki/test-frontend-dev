"use client";
import { useEffect, useState } from "react";
import { useModuleByClass } from "../hooks/useModuleByClass"
import { AcademicCapSvg } from "../components/ui/AcademicCapSvg"
import { useAppContext } from "../context/AppContext";
const Video = ({ src, onError }) => {
  return (
    <video src={src} onError={onError} controls className="w-full h-auto lg:mb-4 aspect-video md:border border-white/20">
    </video>
  );
};

const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-600 lg:mb-4">
      <div className="flex flex-col items-center justify-center rounded-lg p-8 w-full aspect-video">
        <div className="sm:p-4">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12 sm:size-16 stroke-white/60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-center leading-5">
          Este video no está disponible
        </h3>
        <p className="text-center max-md:text-xs">
          El video que intentas ver no está disponible en este momento.
        </p>
      </div>
    </div>
  );
};

const VideoPlayer = ({ data }) => {
  const { classSelected } = useAppContext()
  const { titulo, video } = classSelected
  const foundModule = useModuleByClass(data, titulo)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setHasError(false);
  }, [video]);
  return (
    <section className="lg:ps-4 md:px-4 animate-fade-in-scale">
      <div className="flex flex-col">
        <h2 className="text-center text-2xl md:text-4xl font-extrabold h-20 grid place-content-center text-pretty">
          {video ? `${titulo}` : ""}
        </h2>
        <figure>
          {(hasError || !video) ? <ErrorComponent /> : <Video src={video} onError={() => setHasError(true)} />}
        </figure>
        <div className="flex gap-4 mb-6 max-lg:mt-6 items-center max-md:px-4">
          <div className="border border-emerald-600 w-min rounded-full p-1 h-min"><AcademicCapSvg className="size-10 stroke-emerald-600" /></div>
          <div className="flex flex-col gap-1">
            <span className="uppercase text-balance">{foundModule?.titulo}</span>
            <span className="text-xs sm:text-sm text-white/50 text-pretty">{foundModule?.descripcion}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default VideoPlayer