"use client";

import { useState, useEffect } from "react";
import { PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { login } from "@/utils/auth";
import { fetchModules } from "@/utils/api";

export default function CourseNavigation({ onSelectLesson }) {
  const [activeModules, setActiveModules] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await login();
        const data = await fetchModules(token);
        setModules(data);
        setActiveModules(data.map((_, index) => `module-${index + 1}`));

        const savedWatched = localStorage.getItem("watchedVideos");
        if (savedWatched) {
          setWatchedVideos(JSON.parse(savedWatched));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const markAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      const newWatchedVideos = [...watchedVideos, videoId];
      setWatchedVideos(newWatchedVideos);
      localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos));
    }
  };

  const handleSelectLesson = (video, titulo) => {
    onSelectLesson(video, titulo);
    markAsWatched(video);
  };

  if (loading) {
    return (
      <section className="p-4">
        <p>Cargando...</p>
      </section>
    );
  }

  return (
    <nav className="h-full overflow-y-auto">
      <header className="p-4 border-b">
        <section className="mb-2">
          <h1 className="font-bold text-center text-4xl">Blockchain</h1>
        </section>
      </header>

      <section className="py-2 px-4 bg-muted/30 border-b">
        <h2 className="font-semibold text-2xl">Contenido del curso</h2>
      </section>

      <Accordion type="multiple" value={activeModules} onValueChange={setActiveModules} className="w-full">
        {modules.map((module, index) => (
          <article key={index}>
            <AccordionItem value={`module-${index + 1}`} className="border-b">
              <AccordionTrigger className="px-4 py-3 hover:underline">
                <header className="flex flex-col items-start text-left">
                  <nav className="flex justify-between w-full">
                    <h3 className="font-medium text-lg">{module.titulo}</h3>
                  </nav>
                </header>
              </AccordionTrigger>

              <AccordionContent>
                <ul className="py-1">
                  {module.clases.map((clase, idx) => {
                    const isWatched = watchedVideos.includes(clase.video);

                    return (
                      <li key={idx} className={`px-4 py-2 hover:bg-muted ${clase.current ? "bg-muted" : ""}`}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start p-0 h-auto font-normal text-sm ${clase.current ? "text-primary" : ""}`}
                          onClick={() => handleSelectLesson(clase.video, clase.titulo)}
                        >
                          <nav className="flex items-start gap-3">
                            <figure className="mt-0.5">
                              {isWatched ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : clase.current ? (
                                <PlayCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </figure>
                            <section className="flex flex-col items-start">
                              <span className="text-lg">{clase.titulo}</span>
                              <time className="text-xs text-muted-foreground">{clase.duracion}</time>
                            </section>
                          </nav>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </article>
        ))}
      </Accordion>
    </nav>
  );
}
