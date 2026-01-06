import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';
import { X } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const Popup = ({ onClose, activeImage }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      
      {/* CRITICAL FIX: 
         We scope these styles using the unique class '.popup-swiper-container'
         This prevents Swiper styles from breaking the Hero cards layout.
      */}
      <style>{`
        .popup-swiper-container .swiper {
          width: 100%;
          height: 100%;
          overflow: visible; /* Allows cards to stack visibly */
        }
        .popup-swiper-container .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          /* Reset any potential global conflicts */
          position: relative !important; 
          left: 0 !important;
          top: 0 !important;
          transform: translate3d(0,0,0) !important;
        }
      `}</style>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 hover:bg-red-500 rounded-full text-white transition-all backdrop-blur-md border border-white/20"
      >
        <X size={24} />
      </button>

      {/* Unique Wrapper Class added here */}
      <div className="popup-swiper-container relative w-[300px] md:w-[350px] h-[500px]">
        <Swiper
          direction={'vertical'}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, EffectCards]}
          effect={'cards'}
          grabCursor={true}
          className="mySwiper"
          cardsEffect={{
             slideShadows: false, // Cleaner look on dark backgrounds
             perSlideOffset: 8,
             perSlideRotate: 2
          }}
        >
          {/* --- SLIDE 1 --- */}
          <SwiperSlide>
             <div className="w-full h-full bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                <div className="h-[60%] w-full relative">
                    <img 
                      src={activeImage || "/images/img1.jpg"} 
                      alt="Selected" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-jashn-gold mb-2">Event Highlights</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Swipe up to see the live schedule.
                    </p>
                </div>
             </div>
          </SwiperSlide>

          {/* --- SLIDE 2 --- */}
          <SwiperSlide>
             <div className="w-full h-full bg-[#050816] rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-6 flex flex-col justify-center">
               <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                  LIVE UPDATES
               </h3>
               <div className="space-y-4 w-full">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-green-400 font-mono font-bold animate-pulse">● NOW</span>
                        <span className="text-xs text-gray-500">Main Stage</span>
                      </div>
                      <p className="font-bold text-white">Inter-College Dance</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 opacity-70">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-yellow-400 font-mono">NEXT</span>
                        <span className="text-xs text-gray-500">Arena 1</span>
                      </div>
                      <p className="font-bold text-white">Star Night</p>
                  </div>
               </div>
             </div>
          </SwiperSlide>

          {/* --- SLIDE 3 --- */}
          <SwiperSlide>
             <div className="w-full h-full bg-gradient-to-br from-jashn-purple to-indigo-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center">
               <h2 className="text-3xl font-black text-white mb-2">READY?</h2>
               <p className="text-white/70 mb-8 text-sm">Join the legacy.</p>
               <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
               >
                  Close
               </button>
             </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  );
};

export default Popup;
