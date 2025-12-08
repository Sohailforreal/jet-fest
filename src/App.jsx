import React from 'react';
import HeroGsap from './components/HeroGsap';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

// Data for forms
const FORMS = [
  { 
    title: "Kalanjali", 
    role: "Coordinator", 
    color: "from-jashn-purple to-indigo-900",
    link: "https://docs.google.com/forms/u/0/" 
  },
  { 
    title: "Promethean", 
    role: "Coordinator", 
    color: "from-pink-600 to-rose-900",
    link: "https://docs.google.com/forms/u/0/" 
  },
  { 
    title: "Athlon", 
    role: "Coordinator", 
    color: "from-emerald-600 to-teal-900",
    link: "https://docs.google.com/forms/u/0/" 
  },
  { 
    title: "Magazine", 
    role: "Coordinator", 
    color: "from-jashn-gold to-yellow-700",
    link: "https://docs.google.com/forms/u/0/" 
  },
];

const GlassCard = ({ title, role, color, link, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`relative group p-6 rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-jashn-gold/50 transition-all duration-300`}
  >
    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500`}></div>
    
    <div className="relative z-10 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <span className="text-sm text-gray-400 flex items-center gap-2">
          <User size={14} /> {role}
        </span>
      </div>
      
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-jashn-gold group-hover:text-black transition-colors cursor-pointer"
      >
        <ArrowRight size={18} />
      </a>
    </div>
  </motion.div>
);


function App() {
  return (
    <div className="min-h-screen relative  selection:bg-jashn-gold selection:text-black font-sans text-white">
      
      {/* NEW BACKGROUNDS */}
      <div className="cyber-gradient" /> {/* The color shift */}
      <div className="grid-overlay" />   {/* The texture */}


      {/* NEW HERO SECTION */}
      <HeroGsap />


      {/* OG / ORIGIN SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5 mt-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
             <h2 className="text-3xl font-bold mb-4 text-jashn-gold">THE VIBE</h2>
             <p className="text-gray-300 leading-relaxed">
               Jashn-E-Theem isn't just a fest; it's an emotion. We are looking for the ones who can carry the torch. 
               The wild ones, the creative ones, the ones who get things done.
             </p>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <span className="text-gray-500 italic">OG Fest Video / Image Placeholder</span>
             </div>
          </div>
        </div>
      </section>

      {/* COORDINATOR FORMS SECTION */}
      <section className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Join the Team</h2>
          <p className="text-center text-gray-400 mb-12">Select a department to apply</p>
          
          <div className="space-y-4">
            {FORMS.map((form, index) => (
              <GlassCard key={index} {...form} index={index} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5">
        Built with ❤️ for JET 2026
      </footer>
    </div>
  );
}

export default App;
