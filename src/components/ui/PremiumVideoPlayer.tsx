import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlayHover?: boolean;
  children?: React.ReactNode;
}

export function PremiumVideoPlayer({ src, poster, className, autoPlayHover = true, children }: PremiumVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Auto-play on mobile/initial load if possible, but muted
    if (autoPlayHover && window.matchMedia('(hover: none)').matches) {
        video.play().catch(() => {});
        setIsPlaying(true);
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [autoPlayHover]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoPlayHover && videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoPlayHover && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-2xl group bg-stone-900 cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted={isMuted}
        loop={autoPlayHover}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      
      {/* Dark overlay that appears when paused for better control visibility */}
      <div className={cn(
        "absolute inset-0 bg-black/30 transition-opacity duration-300 flex items-center justify-center",
        !isPlaying ? "opacity-100" : "opacity-0"
      )}>
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
            >
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Mute Button (so mobile users can unmute) */}
      <button 
        onClick={toggleMute}
        className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-colors border border-white/10"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Controls Container */}
      <div className={cn(
        "absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
        isHovered || !isPlaying ? "opacity-100" : "opacity-0 sm:opacity-0 opacity-100" // always show gradient on mobile for text visibility
      )}>
        {/* Progress bar */}
        <div className="absolute top-0 inset-x-4 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF5C28] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {children}
    </motion.div>
  );
}
