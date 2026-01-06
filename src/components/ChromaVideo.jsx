import React, { useRef, useEffect } from 'react';

const ChromaVideo = ({ src, className, endingSpeed = false }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const processFrame = () => {
      if (video.paused || video.ended) return;

      // 1. Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 2. Get pixel data
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const length = frame.data.length;

      // 3. Remove BLACK pixels
      for (let i = 0; i < length; i += 4) {
        const r = frame.data[i];
        const g = frame.data[i + 1];
        const b = frame.data[i + 2];

        // Threshold: If darker than dark gray (60), make transparent
        if (r < 60 && g < 60 && b < 60) {
          frame.data[i + 3] = 0; // Alpha = 0
        }
      }

      // 4. Put clean image back
      ctx.putImageData(frame, 0, 0);

      animationFrameId.current = requestAnimationFrame(processFrame);
    };

    // Initialize Canvas Size
    const handleMetadata = () => {
      canvas.width = video.videoWidth || 300;
      canvas.height = video.videoHeight || 300;
      // Attempt to play immediately
      video.play().catch(e => console.log("Autoplay prevented:", e));
    };

    const handlePlay = () => {
      processFrame();
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('play', handlePlay);
    
    // Slow Motion Logic
    const handleTimeUpdate = () => {
      if (endingSpeed && video.duration - video.currentTime < 3) {
         video.playbackRate = 0.9;
      }
    };

    if (endingSpeed) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [endingSpeed]);

  return (
    <div className={`relative ${className}`}>
  
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay // Try native autoplay
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full opacity-0 -z-10" 
      />
      
      {/* The Clean Canvas Output */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(250,204,107,0.3)]"
      />
    </div>
  );
};

export default ChromaVideo;
