import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CARDS = [
  "./public/images/img1.jpg",
  "./public/images/img2.jpg",
  "./public/images/img3.jpg",
  "./public/images/img4.jpg",
];

export default function HeroGsap() {
  const containerRef = useRef();
  const cardsRef = useRef([]);
  const logoGroupRef = useRef();
  const textRef = useRef();
  const videoRef = useRef(null);

  // --- LOGIC 1: Video Slow Motion Ending ---
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // If video has less than 1.5 seconds left...
      if (video.duration - video.currentTime < 1.5) {
        // Smoothly tween the playback speed from 1 to 0.1
        gsap.to(video, { 
          playbackRate: 0.4, 
          duration: 1, 
          ease: "power2.out" 
        });
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // --- LOGIC 2: Entrance & Floating Animations ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Setup Initial States (Hidden & Centered)
    gsap.set(cardsRef.current, {
      xPercent: -50, 
      yPercent: -50,
      left: "50%",
      top: "50%",
      scale: 0,
      opacity: 0,
      y: 400 // Push down off-screen initially
    });

    gsap.set(logoGroupRef.current, { y: -50, opacity: 0 });
    gsap.set(textRef.current, { y: 50, opacity: 0 });

    // 2. ENTRANCE SEQUENCE
    tl.to(logoGroupRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      scale: 1.12,
      ease: "power3.out"
    })

    .to(cardsRef.current, {
      duration: 1.2,
      y: (i) => {
        // Arch: Middle cards higher (-20), outer cards lower (10)
        return [10, -20, -20, 10][i];
      },
      x: (i) => {
        // Horizontal Spread
        return [-150, -50, 50, 150][i];
      },
      rotation: (i) => {
        // Fan Angle
        return [-15, -5, 5, 15][i];
      },
      scale: 1,
      opacity: 1,
      ease: "back.out(1.4)", // Snappy bounce effect
      stagger: 0.1,
    }, "-=0.5")

    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8");

    // 3. CONTINUOUS FLOATING LOOP
    // Starts after entrance is complete
    gsap.to(cardsRef.current, {
      y: "+=15", // Gently float down 15px
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.15,
        from: "center"
      },
      delay: 1.5 
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-[90vh] w-full flex flex-col items-center pt-10 pb-10 gap-2 overflow-hidden">
      
      {/* 1. VIDEO LOGO + DATES */}
      <div ref={logoGroupRef} className="z-20 relative flex flex-col items-center">
        
        {/* VIDEO ELEMENT */}<video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className="w-82 h-82 md:w-96 md:h-96 object-contain pointer-events-none"
  style={{
    // 1. Aggressive Blending
    mixBlendMode: 'lighten', 
    
    // 2. High Contrast (Crushes dark gray to black)
    filter: 'contrast(1.2) brightness(1.1)', 
    
    // 3. THE MASK: Hides the rectangular borders of the video
    // This creates a soft circle so you don't see the "box"
    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
    maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
  }}
>
  <source src="/logo.mp4" type="video/mp4" />
</video>

       
        
        {/* DATES BADGE */}
        <div className="mt-2 px-4 py-1 border border-jashn-gold/30 rounded-full bg-black/40 backdrop-blur-sm">
          <span className="font-mono text-sm md:text-lg tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-jashn-gold drop-shadow-md">
            02 FEB - 07 FEB 2026
          </span>
        </div>
      </div>

      {/* 2. THE GALLERY STAGE */}
      <div className="relative w-full h-[280px] z-10">
        {CARDS.map((src, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            // Absolute positioning with center anchoring
            className="absolute left-1/2 top-1/2 w-32 h-48 md:w-40 md:h-56 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden bg-black"
          >
            <img 
              src={src} 
              alt="Event" 
              className="w-full h-full object-cover filter brightness-90"
            />
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* 3. THE TEXT */}
      <div ref={textRef} className="z-20 text-center mt-auto px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
          COORDINATOR FORMS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-jashn-gold to-orange-500">
            ARE LIVE
          </span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-sm mx-auto text-sm md:text-base">
            Join the team behind the legacy. Apply now.
        </p>
      </div>

    </div>
  );
}
