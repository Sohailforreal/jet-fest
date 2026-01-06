import React, { useRef } from 'react';
import HeroGsap from './components/HeroGsap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Zap, Music, Trophy, Phone, Calendar, User, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// UPDATED DATA: Sub-events are now Objects with their own links
const EVENTS = [
  { 
    title: "KALANJALI",
    subtitle: "Cultural Events",
    icon: <Music size={28} className="text-pink-500" />,
    color: "from-rose-900 to-pink-900",
    mainLink: "https://docs.google.com/forms/u/0/", // Main Folder Link
    subEvents: [
      { name: "Drawing Competition", link: "https://docs.google.com/forms/singing" },
      { name: "Singing", link: "https://docs.google.com/forms/singing" },
      { name: "Solo Dance", link: "https://docs.google.com/forms/dance" },
      { name: "Group Dance", link: "https://docs.google.com/forms/group" }
    ],
    dates: "02 Feb - 03 Feb",
    secretary: "Rubhan Ramakrishnan",
    phone: "+91 98765 43210"
  },
  { 
    title: "PROMETHEAN", 
    subtitle: "Technical Events",
    icon: <Zap size={28} className="text-cyan-400" />,
    color: "from-indigo-900 to-purple-900",
    mainLink: "https://docs.google.com/forms/u/0/",
    subEvents: [
      { name: "Robo Race", link: "https://docs.google.com/forms/robo" },
      { name: "Junior Scientist", link: "https://docs.google.com/forms/robo" },
    ],
    dates: "04 Feb - 05 Feb",
    secretary: "Shahanawaz Ansari",
    phone: "+91 98765 12345"
  },
  { 
    title: "ATHLON", 
    subtitle: "Sports Championship",
    icon: <Trophy size={28} className="text-jashn-gold" />,
    color: "from-yellow-900 to-amber-900",
    mainLink: "https://docs.google.com/forms/u/0/",
    subEvents: [
      { name: "Cricket", link: "https://docs.google.com/forms/cricket" },
      { name: "Volleyball", link: "https://docs.google.com/forms/volleyball" },
      { name: "Cricket 2", link: "https://docs.google.com/forms/badminton" }
    ],
    dates: "-",
    secretary: "-",
    phone: "+91 -"
  },
];

const EventCard = ({ event, index }) => (
  // CHANGED: Outer tag is now a DIV, not an 'a' tag.
  <div className="form-card group relative block">
    
    <div className="relative p-6 md:p-8 rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/10 transition-all duration-300 hover:border-jashn-gold/50 hover:shadow-[0_0_30px_rgba(250,204,107,0.15)] group-hover:-translate-y-1">
      
      {/* Background Gradient Blob */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${event.color} opacity-10 group-hover:opacity-25 blur-[80px] transition-opacity`}></div>

      <div className="relative z-10">
        {/* Header: Icon & Title */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {event.icon}
            </div>
            <div>
              <h3 className="text-2xl font-black text-white italic tracking-wider uppercase">{event.title}</h3>
              <p className="text-xs text-gray-400 font-mono tracking-widest">{event.subtitle}</p>
            </div>
          </div>
          
          {/* Main Link Arrow (Clickable) */}
          <a 
            href={event.mainLink}
            target="_blank" 
            rel="noopener noreferrer"
            title="View All Events"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-jashn-gold hover:text-black transition-all transform hover:rotate-[-45deg] z-20"
          >
             <ArrowRight size={20} />
          </a>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        {/* Sub Events Badges (Clickable Links) */}
        <div className="flex flex-wrap gap-2 mb-6">
           {event.subEvents.map((sub, i) => (
             <a 
               key={i} 
               href={sub.link}
               target="_blank" 
               rel="noopener noreferrer"
               className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 hover:border-jashn-gold/50 hover:text-jashn-gold transition-all cursor-pointer flex items-center gap-1"
             >
               {sub.name}
               <ExternalLink size={10} className="opacity-50" />
             </a>
           ))}
        </div>

        {/* Footer: Date & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
           
           {/* Date */}
           <div className="flex items-center gap-2">
              <Calendar size={16} className="text-jashn-gold" />
              <span>{event.dates}</span>
           </div>
           
           {/* Secretary Info & Clickable Phone */}
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                 <User size={16} className="text-purple-400" />
                 <span className="font-semibold text-gray-300">{event.secretary}</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              
              {/* CLICKABLE PHONE NUMBER */}
              <a 
                href={`tel:${event.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"
                title="Call Secretary"
              >
                 <Phone size={14} />
                 <span className="font-mono text-xs">{event.phone}</span>
              </a>
           </div>
        </div>

      </div>
    </div>
  </div>
);

function App() {
  const mainRef = useRef();

  useGSAP(() => {
    // 1. OG Animation
    const tlOg = gsap.timeline({
      scrollTrigger: {
        trigger: ".og-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    tlOg.from(".og-text", { x: -50, opacity: 0, duration: 0.8 })
        .from(".og-visual", { x: 50, opacity: 0, duration: 0.8 }, "-=0.6");

    // 2. Events Stagger Animation
    gsap.from(".form-card", {
      scrollTrigger: {
        trigger: ".events-section",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen relative selection:bg-jashn-gold selection:text-black font-sans text-white overflow-hidden">
      
      {/* BACKGROUNDS */}
      <div className="cyber-gradient" /> 
      <div className="grid-overlay" />   

      <HeroGsap />

      {/* --- OG SECTION --- */}
      <section className="og-section py-24 px-6 max-w-6xl mx-auto mt-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-jashn-gold to-transparent opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="og-text flex-1 text-center md:text-left">
             <div className="inline-block px-3 py-1 mb-4 border border-purple-500/30 rounded-full bg-purple-900/20 backdrop-blur-md">
                <span className="text-xs font-mono text-purple-300 tracking-widest uppercase">The Origin Story</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
               MORE THAN <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-jashn-gold to-orange-400">JUST A FEST</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
               Jashn-E-Theem is an emotion. It's where sleepless nights meet stage lights. We are hunting for the <span className="text-white font-semibold">wild ones</span>, the creative souls, and the leaders who will carry the torch for 2026.
             </p>
          </div>
          <div className="og-visual flex-1 w-full max-w-md relative">
             <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                <div className="w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center flex-col gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                    <span className="text-sm font-mono text-gray-500">OFFICIAL TEASER</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- EVENTS SECTION --- */}
      <section className="events-section py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter mb-4 text-white">
              INTER <span className="text-jashn-gold">ARENAS</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-jashn-gold to-transparent mx-auto mb-4"></div>
            <p className="text-gray-400">Choose your category. Rule the stage.</p>
          </div>
          
          <div className="grid gap-6">
            {EVENTS.map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5">
        <p className="text-gray-600 text-sm">Built with ⚡️ for JET 2026</p>
      </footer>
    </div>
  );
}

export default App;
