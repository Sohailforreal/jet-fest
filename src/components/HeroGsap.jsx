import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChromaVideo from './ChromaVideo';
import Popup from './Popup';

// IMPORTANT: Ensure these images exist in public/images/
// If they are in public/images, the path should be "/images/name.jpg"
const CARDS = [
  "/images/img3.jpg",
  "/images/img2.jpg",
  "/images/img1.jpg",
  "/images/img4.jpg",
];

export default function HeroGsap() {
  const containerRef = useRef();
  const cardsRef = useRef([]);
  const logoGroupRef = useRef();
  const textRef = useRef();
  const headerRef = useRef(); 
  
  // Popup State
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCardClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setPopupOpen(true);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // 1. Setup Initial States
    // Note: We set left/top to 50% here for GSAP, but the CSS class handles the hard positioning
    gsap.set(cardsRef.current, { 
      xPercent: -50, 
      yPercent: -50, 
      scale: 0, 
      opacity: 0, 
      y: 400 
    });
    
    gsap.set(logoGroupRef.current, { y: -30, opacity: 0 });
    gsap.set(textRef.current, { y: 50, opacity: 0 });
    gsap.set(headerRef.current, { y: -20, opacity: 0 });

    // 2. Animation Sequence
    // Header comes in first
    tl.to(headerRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      
      // Then Logo
      .to(logoGroupRef.current, { y: 0, opacity: 1, duration: 1, scale: 1.12, ease: "power3.out" }, "-=0.5")
      
      // Then Cards Explosion
      .to(cardsRef.current, { 
        duration: 1.2, 
        y: (i) => [10, -20, -20, 10][i], 
        x: (i) => [-150, -50, 50, 150][i], 
        rotation: (i) => [-15, -5, 5, 15][i], 
        scale: 1, 
        opacity: 1, 
        ease: "back.out(1.4)", 
        stagger: 0.1 
      }, "-=0.5")
      
      // Then Bottom Text
      .to(textRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");
    
    // 3. Continuous Floating Loop
    gsap.to(cardsRef.current, { 
      y: "+=15", 
      duration: 2.5, 
      ease: "sine.inOut", 
      yoyo: true, 
      repeat: -1, 
      stagger: { each: 0.15, from: "center" }, 
      delay: 1.5 
    });

  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative min-h-[90vh] w-full flex flex-col items-center pt-10 pb-10 gap-2 overflow-hidden">
        
        {/* --- COLLEGE HEADER (SERIF FONTS) --- */}
        <div ref={headerRef} className="z-30 text-center flex flex-col items-center mb-2 px-4">
          <h3 className="text-xs md:text-sm font-serif text-gray-300 tracking-widest uppercase opacity-90 mb-1">
            H.J. Thim Trust's
          </h3>
          <h1 className="text-2xl md:text-5xl font-serif font-bold text-white tracking-wide leading-tight drop-shadow-lg">
            Theem College Of Engineering
          </h1>
          <p className="text-[10px] md:text-xs font-serif text-gray-400 opacity-80 mt-2 tracking-wider">
            Village Betegaon, Chillar Road, Boisar (E)
          </p>
          {/* Decorative Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-jashn-gold/50 to-transparent mt-4"></div>
        </div>

        {/* --- LOGO SECTION --- */}
        <div ref={logoGroupRef} className="z-20 relative flex flex-col items-center">
          <ChromaVideo 
            src="/logo.mp4" 
            className="w-64 h-64 md:w-96 md:h-96" 
            endingSpeed={true} 
          />
          <div className="mt-2 px-4 py-1 border border-jashn-gold/30 rounded-full bg-black/40 backdrop-blur-sm">
            <span className="font-mono text-sm md:text-lg tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-jashn-gold drop-shadow-md">
              02 FEB - 07 FEB 2026
            </span>
          </div>
        </div>

        {/* --- GALLERY STAGE --- */}
        <div className="relative w-full h-[280px] z-10">
          {CARDS.map((src, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              onClick={() => handleCardClick(src)}
              // CRITICAL FIX: !left-1/2 !top-1/2 ensures Swiper styles don't break this
              className="absolute !left-1/2 !top-1/2 w-32 h-48 md:w-40 md:h-56 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden bg-black cursor-pointer hover:border-jashn-gold transition-colors z-30"
            >
              <img 
                src={src} 
                alt="Event" 
                className="w-full h-full object-cover filter brightness-90 hover:brightness-110 transition-all" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM TEXT --- */}
        <div ref={textRef} className="z-20 text-center mt-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            EVENT REGISTRATIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jashn-gold to-orange-500">
              ARE LIVE
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-sm mx-auto text-sm md:text-base">
             Battle for glory. Register for Inter-College Events now.
          </p>
        </div>

      </div>

      {/* --- POPUP COMPONENT --- */}
      {isPopupOpen && (
        <Popup 
          activeImage={selectedImage} 
          onClose={() => setPopupOpen(false)} 
        />
      )}
    </>
  );
}
