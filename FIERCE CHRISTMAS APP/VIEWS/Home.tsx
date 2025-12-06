
import React from 'react';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pb-safe-music">
      {/* Hero Header - BRANDED */}
      <div className="relative pt-16 pb-8 px-6 text-center">
        <div className="mb-2 flex justify-center">
             <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
        </div>
        
        {/* Logo / Title Logic */}
        <div className="flex justify-center mb-2">
            <img 
              src="/logo.png" 
              alt="FIERCE Manifestations" 
              className="h-20 w-auto object-contain drop-shadow-lg"
              onError={(e) => {
                // Fallback to text if logo image is missing
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <h1 className="hidden text-4xl md:text-5xl font-serif font-bold text-white leading-tight tracking-wide drop-shadow-lg">
              FIERCE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200">Manifestations</span>
            </h1>
        </div>

        <div className="text-red-100 text-xs md:text-sm font-sans tracking-widest uppercase opacity-80 mb-6">
          The Companion Journal to <br/>
          <span className="font-bold text-white text-base md:text-lg mt-2 block tracking-[0.2em]">A FIERCE CHRISTMAS</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-4 pb-8">
        {/* Dashboard Banner - Compact */}
        <div 
           onClick={() => onNavigate('dashboard')}
           className="mb-8 relative overflow-hidden bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-between group hover:bg-white/10"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl text-white animate-spin-slow ring-1 ring-white/10">
               📊
             </div>
             <div>
               <h2 className="text-sm font-bold text-white leading-none uppercase tracking-wide">My Dashboard</h2>
               <p className="text-gray-400 text-[10px] mt-1">View stats & manage data</p>
             </div>
          </div>
          <div className="text-gray-500 group-hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-4 text-center">Begin Your Journey</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'december', title: 'December Diamond', icon: '💎', bgColor: 'bg-blue-900/40', border: 'border-blue-400/30', anim: 'animate-float' },
            { id: 'sleigh', title: 'Sleigh All Day', icon: '🛷', bgColor: 'bg-amber-900/40', border: 'border-amber-400/30', anim: 'animate-wiggle' },
            { id: 'fiercest', title: 'A Few of My FIERCEST Things', icon: '✨', bgColor: 'bg-green-900/40', border: 'border-green-400/30', anim: 'animate-pulse-slow' },
            { id: 'heels', title: 'Holiday Heels', icon: '👠', bgColor: 'bg-pink-900/40', border: 'border-pink-400/30', anim: 'animate-float' },
            { id: 'claus', title: 'The Claus Effect', icon: '👑', bgColor: 'bg-red-900/40', border: 'border-red-400/30', anim: 'animate-pulse-slow' },
            { id: 'grinch', title: 'Grinch-ified', icon: '💚', bgColor: 'bg-emerald-900/40', border: 'border-emerald-400/30', anim: 'animate-float' },
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative h-32 ${item.bgColor} backdrop-blur-md rounded-2xl p-4 border ${item.border} flex flex-col justify-between active:scale-[0.96] transition-all cursor-pointer hover:bg-black/30 shadow-lg overflow-hidden group`}
            >
              <div className="flex justify-between items-start z-10">
                 <div className={`text-3xl filter drop-shadow-md transform transition-transform group-hover:scale-110 ${item.anim}`}>
                   {item.icon}
                 </div>
              </div>
              
              <div className="z-10">
                <h3 className="text-sm font-bold text-white leading-tight font-serif tracking-wide border-l-2 border-white/20 pl-2">
                  {item.title}
                </h3>
              </div>
              
              {/* Subtle glass reflection */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Social Media Footer */}
        <div className="mt-12 text-center pb-8 border-t border-white/5 pt-8">
            <p className="text-xs font-serif italic text-white/40 mb-4">Connect with FIERCE Manifestations</p>
            <div className="flex justify-center gap-8 mb-6">
                <a 
                    href="https://www.instagram.com/fiercemanifestations/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white/60 hover:text-pink-400 transition-colors transform hover:scale-110"
                    aria-label="Instagram"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                    href="https://www.tiktok.com/@fiercemanifestations" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white/60 hover:text-cyan-400 transition-colors transform hover:scale-110"
                    aria-label="TikTok"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
                <a 
                    href="https://sptfy.in/rnl5" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white/60 hover:text-green-400 transition-colors transform hover:scale-110"
                    aria-label="Spotify"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.24c3.16-1 6.84-1 10 .5"></path><path d="M7.5 15c3.68-1.5 7.82-1.5 11.5.5"></path><path d="M9 18c2.63-.75 5.37-.75 8 .5"></path></svg>
                </a>
            </div>
            <p className="text-[10px] text-white/20">© FIERCE Manifestations</p>
        </div>
      </div>
    </div>
  );
};
