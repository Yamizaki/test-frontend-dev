'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDeviceDetection, useTouchInteractions } from '@/hooks/useDeviceDetection';

/**
 * Componente de reproductor de video optimizado para diferentes dispositivos
 * Adaptado para pantallas táctiles y no táctiles
 */
const VideoPlayer = React.memo(function VideoPlayer({ 
  videoUrl, 
  thumbnail = '', 
  className = '',
  autoPlay = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const { isTouchDevice, isPortrait, isMobile } = useDeviceDetection();
  const touchInteractions = useTouchInteractions();

  // Formatear tiempo en formato mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Gestionar reproducción
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error al reproducir video:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Actualización de progreso
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      setCurrentTime(current);
      
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };
  
  // Gestionar carga de metadatos
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoaded(true);
      
      if (autoPlay) {
        togglePlay();
      }
    }
  };
  
  // Gestionar click en barra de progreso
  const handleProgressClick = (e) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      
      // Clamping para asegurar que está entre 0 y 1
      const clampedPosition = Math.max(0, Math.min(position, 1));
      
      videoRef.current.currentTime = clampedPosition * videoRef.current.duration;
    }
  };
  
  // Gestionar volumen
  const handleVolumeChange = (value) => {
    const newVolume = parseFloat(value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };
  
  // Ocultar controles después de inactividad (solo en escritorio)
  const hideControls = () => {
    if (!isTouchDevice) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
  };
  
  // Mostrar controles al mover el mouse
  const showPlayerControls = () => {
    setShowControls(true);
    hideControls();
  };
  
  // Gestionar fin del video
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(100);
    setShowControls(true);
  };
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  
  // Propiedades para interacciones táctiles/mouse
  const videoContainerProps = touchInteractions.getInteractionProps(
    togglePlay,
    {
      className: `relative w-full aspect-video bg-black ${className}`,
      // En dispositivos táctiles, siempre mostrar controles
      touchClass: 'touch-manipulation',
      // En desktops, mostrar/ocultar controles según estado
      mouseClass: '',
      // Eventos adicionales para desktop
      onMouseMove: showPlayerControls,
      onMouseLeave: () => {
        if (isPlaying) {
          setShowControls(false);
        }
      }
    }
  );
  
  return (
    <div {...videoContainerProps}>
      {/* Thumbnail que se muestra antes de cargar */}
      {!isLoaded && thumbnail && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <img 
            src={thumbnail} 
            alt="Video thumbnail" 
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <button 
            className="absolute inset-0 flex items-center justify-center"
            onClick={togglePlay}
            aria-label="Reproducir video"
          >
            <div className="bg-blue-600 rounded-full p-4 transform transition-transform hover:scale-110 shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="white" 
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      )}
      
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Su navegador no soporta el elemento video.
      </video>
      
      {/* Overlay para controles flotantes */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          showControls || isTouchDevice ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* Controles personalizados */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 ${
          showControls || isTouchDevice ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de progreso */}
        <div 
          ref={progressBarRef}
          className="h-1.5 bg-gray-600 rounded-full overflow-hidden mb-2 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className="bg-blue-500 h-full group-hover:bg-blue-400 transition-colors"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Botones de control */}
          <div className="flex items-center">
            {/* Play/Pause */}
            <button 
              className="text-white mr-4 hover:text-blue-400 transition-colors"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            
            {/* Volumen (solo en desktop) */}
            {!isMobile && (
              <div className="flex items-center mr-4 group relative">
                <button
                  className="text-white hover:text-blue-400 transition-colors"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                
                {/* Control deslizante de volumen */}
                <div className="hidden group-hover:block absolute bottom-full left-0 bg-gray-800 p-2 rounded shadow-lg transform -translate-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                    className="w-24 accent-blue-500"
                  />
                </div>
              </div>
            )}
            
            {/* Tiempo */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          {/* Botones adicionales (pantalla completa, etc.) */}
          <div className="flex items-center">
            {/* Pantalla completa */}
            <button
              className="text-white hover:text-blue-400 transition-colors"
              onClick={() => {
                if (videoRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    videoRef.current.requestFullscreen();
                  }
                }
              }}
              aria-label="Pantalla completa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;