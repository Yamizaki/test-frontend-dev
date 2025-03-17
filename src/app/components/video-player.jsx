"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DEFAULT_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export default function VideoPlayer({ videoUrl, title }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [videoUrl]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = async (event) => {
    if (event) event.stopPropagation();
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        await videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error al reproducir el video:", error);
      setHasError(true);
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? volume : 0;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value) => {
    const newTime = value[0];
    setProgress(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = (newTime / 100) * (videoRef.current.duration || 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(formatTime(videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => isPlaying && setShowControls(false), 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  const finalVideoUrl = !videoUrl || hasError ? DEFAULT_VIDEO_URL : videoUrl;

  return (
    <section className="relative group bg-black w-full aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        src={finalVideoUrl}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setHasError(true)}
      />

      <header className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent text-white transition-opacity duration-300">
        <h2 className="text-xl font-semibold">{title}</h2>
      </header>

      <footer
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        } z-20`}
      >
        <Slider value={[progress]} min={0} max={100} step={0.1} onValueChange={handleSeek} className="mb-2" />

        <nav className="flex items-center justify-between">
          <menu className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => skipTime(-10)} className="text-white hover:bg-white/20 ">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => skipTime(10)} className="text-white hover:bg-white/20">
              <SkipForward className="h-5 w-5" />
            </Button>

            <menu className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <nav className="w-20 hidden sm:block">
                <Slider value={[isMuted ? 0 : volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} />
              </nav>
            </menu>

            <time className="text-white text-sm ml-2">
              {currentTime} / {duration}
            </time>
          </menu>

          <menu className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Calidad: 1080p</DropdownMenuItem>
                <DropdownMenuItem>Velocidad: Normal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              <Maximize className="h-5 w-5" />
            </Button>
          </menu>
        </nav>
      </footer>

      {!isPlaying && (
        <aside className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-white/20 text-white hover:bg-white/30 pointer-events-auto"
          >
            <Play className="h-8 w-8" />
          </Button>
        </aside>
      )}
    </section>
  );
}
