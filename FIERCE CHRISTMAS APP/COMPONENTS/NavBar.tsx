import React, { useEffect, useState } from 'react';

interface NavBarProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ title, onBack, rightAction, transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || !transparent ? 'bg-black/50 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 h-14 md:h-16">
        <div className="w-20 flex items-center justify-start">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 active:opacity-50 transition"
              aria-label="Go Back"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex-1 text-center">
          <h1 className={`text-lg font-bold font-serif tracking-wide truncate transition-opacity duration-300 ${!scrolled && transparent ? 'opacity-0' : 'opacity-100'}`}>
            {title}
          </h1>
        </div>

        <div className="w-20 flex items-center justify-end">
          {rightAction}
        </div>
      </div>
    </div>
  );
};
