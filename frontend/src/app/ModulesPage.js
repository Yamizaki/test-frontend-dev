"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { CheckCircle, Play, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "./components/ui/Progress";

export default function ModulesPage() {
  const [modulos, setModulos] = useState([]);
  const [error, setError] = useState("");
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchModulos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://test-frontend-dev.onrender.com/api/modulos",
          {
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar los módulos");
        }

        const data = await response.json();

        // Initialize all modules as expanded
        const initialExpandedState = {};
        data.forEach((modulo, index) => {
          initialExpandedState[index] = true;
        });
        setExpandedModules(initialExpandedState);

        // Set first class as selected by default if available
        if (data.length > 0 && data[0].clases.length > 0) {
          setSelectedClase(data[0].clases[0]);
          setSelectedModuleIndex(0);
          setSelectedClassIndex(0);
        }

        // Calculate mock progress (in a real app, this would come from the API)
        const mockProgress = 25; // 25% complete
        setCourseProgress(mockProgress);

        setModulos(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener módulos:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModulos();
  }, [router]);

  const handleClaseClick = (clase, moduleIndex, classIndex) => {
    setSelectedClase(clase);
    setSelectedModuleIndex(moduleIndex);
    setSelectedClassIndex(classIndex);
  };

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }));
  };

  // Mock function to check if a class is completed
  const isClassCompleted = (moduleIndex, classIndex) => {
    // For demo purposes, let's say first module's first class is completed
    return moduleIndex === 0 && classIndex === 0;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1E293B] py-4 px-6 flex justify-between items-center border-b border-[#334155]">
        <h1 className="text-2xl font-bold">Curso de Diseño Web 2025</h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="text-sm text-gray-400">Progreso del curso</div>
            <div className="flex items-center gap-2">
              <Progress value={courseProgress} className="w-32 h-2" />
              <span className="text-sm">{courseProgress}%</span>
            </div>
          </div>
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm">
            Mi perfil
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Main content - Video player and class details */}
        <main className="flex-1 p-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 p-4 m-4 rounded-md">
              <p className="text-red-400">{error}</p>
            </div>
          ) : selectedClase ? (
            <div className="flex flex-col h-full">
              {/* Video section */}
              <div
                className="relative bg-black"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={
                    selectedClase.video ||
                    "https://www.youtube.com/embed/dQw4w9WgXcQ"
                  }
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Class info */}
              <div className="p-6 bg-[#1E293B]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-[#3B82F6] px-2 py-1 rounded">
                    10 Puntos
                  </span>
                  <span className="text-sm text-gray-400">
                    {selectedClase.duracion || "45:35"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Clase N° {String(selectedClassIndex + 1).padStart(2, "0")}:{" "}
                  {selectedClase.titulo}
                </h2>
                <p className="text-gray-300 mb-6">
                  {selectedClase.descripcion ||
                    "En esta clase aprenderás sobre la historia y evolución del internet, desde sus inicios hasta la actualidad."}
                </p>

                {/* Resources and materials */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Recursos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-md hover:bg-[#1E293B] transition-colors"
                    >
                      <div className="bg-[#3B82F6]/20 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#3B82F6]"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">
                          Presentación de la clase
                        </div>
                        <div className="text-sm text-gray-400">PDF - 2.5MB</div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-md hover:bg-[#1E293B] transition-colors"
                    >
                      <div className="bg-[#3B82F6]/20 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#3B82F6]"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Código de ejemplo</div>
                        <div className="text-sm text-gray-400">ZIP - 1.2MB</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">
                Selecciona una clase para comenzar
              </p>
            </div>
          )}
        </main>

        {/* Sidebar with modules and classes */}
        <aside className="w-full md:w-80 bg-[#1E293B] border-t md:border-t-0 md:border-l border-[#334155] overflow-y-auto">
          <div className="p-4 border-b border-[#334155]">
            <h2 className="text-xl font-bold">Contenido del curso</h2>
            <div className="mt-2 flex items-center gap-2">
              <Progress value={courseProgress} className="flex-1 h-2" />
              <span className="text-sm text-gray-400">{courseProgress}%</span>
            </div>
          </div>

          <div className="divide-y divide-[#334155]">
            {modulos.map((modulo, moduleIndex) => (
              <div key={moduleIndex} className="py-2">
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-[#2D3748] transition-colors"
                >
                  <div className="font-medium text-left">
                    <span className="text-[#3B82F6]">
                      MÓDULO {String(moduleIndex + 1).padStart(2, "0")}
                    </span>
                    <div>{modulo.titulo}</div>
                  </div>
                  {expandedModules[moduleIndex] ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {expandedModules[moduleIndex] && (
                  <ul className="bg-[#0F172A]/50">
                    {modulo.clases.map((clase, classIndex) => {
                      const isCompleted = isClassCompleted(
                        moduleIndex,
                        classIndex
                      );
                      const isActive =
                        selectedClase && selectedClase.titulo === clase.titulo;

                      return (
                        <li key={classIndex}>
                          <button
                            onClick={() =>
                              handleClaseClick(clase, moduleIndex, classIndex)
                            }
                            className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-[#2D3748] transition-colors ${
                              isActive ? "bg-[#2D3748]" : ""
                            }`}
                          >
                            <div className="mt-1 flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : isActive ? (
                                <Play className="h-5 w-5 text-[#3B82F6]" />
                              ) : (
                                <Lock className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div className="text-left">
                              <div
                                className={`font-medium ${
                                  isActive ? "text-[#3B82F6]" : ""
                                }`}
                              >
                                Clase N°{" "}
                                {String(classIndex + 1).padStart(2, "0")}:{" "}
                                {clase.titulo}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-0.5 rounded">
                                  10 Puntos
                                </span>
                                <span className="text-xs text-gray-400">
                                  {clase.duracion || "45:35"}
                                </span>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
