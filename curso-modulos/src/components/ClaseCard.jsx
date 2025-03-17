export default function ClaseCard({ clase }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border border-blue-500/20">
      {/* Miniatura del video con overlay de play */}
      <div className="bg-gray-900 h-48 relative flex items-center justify-center overflow-hidden group">
        {/* Icono de video o imagen representativa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="white" 
            viewBox="0 0 24 24" 
            className="h-16 w-16 opacity-20 group-hover:opacity-30 transition-opacity"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        {/* Botón de play al centro */}
        <div className="relative z-10 bg-blue-600 rounded-full p-3 transform transition-transform group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="h-7 w-7"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        {/* Duración en esquina inferior */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded">
          {clase.duracion}
        </div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-white">{clase.titulo}</h3>
        <p className="text-gray-300 mb-4 text-sm">{clase.descripcion}</p>
        
        <div className="flex items-center justify-between mt-3">
          <span 
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              clase.completado 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {clase.completado ? '✓ Completado' : '● Pendiente'}
          </span>
          
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}