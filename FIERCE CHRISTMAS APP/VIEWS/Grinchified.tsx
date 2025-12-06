import React, { useEffect } from 'react';
import { grinchPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { NavBar } from '../COMPONENTS/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

export const Grinchified: React.FC<Props> = ({ data, onOpenPrompt, onNavigate, onLoadSong }) => {
  const isCompleted = (id: number | string) => data.some(d => d.song === 'grinch' && d.prompt_id === id);
  const completedCount = grinchPrompts.filter(p => isCompleted(p.id)).length;
  
  useEffect(() => {
    onLoadSong(songs.grinch);
  }, [onLoadSong]);

  // Dynamic header color based on progress
  const headerColor = completedCount < 4 ? 'text-green-500' : completedCount < 8 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="Grinch-ified" 
        onBack={onNavigate} 
        transparent 
      />

      <div className="pt-24 px-4 pb-8">
        
        <div className="text-center mb-8">
           <div className={`text-6xl mb-2 transition-all duration-500 ${headerColor} filter drop-shadow-lg animate-pulse-slow`}>
             {completedCount < 4 ? '💚' : completedCount < 8 ? '💛' : '❤️'}
           </div>
           <p className="text-white font-serif italic opacity-80">
             {completedCount < 4 ? 'Shadow Work Phase' : completedCount < 8 ? 'Rising Phase' : 'Triumph Phase'}
           </p>
        </div>

        <div className="space-y-3">
          {grinchPrompts.map((item, index) => {
            const completed = isCompleted(item.id);
            const phaseColor = index < 4 ? 'border-green-500/30' : index < 8 ? 'border-amber-500/30' : 'border-red-500/30';
            
            return (
              <div 
                key={index}
                onClick={() => onOpenPrompt(item)}
                className={`group flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${
                  completed 
                    ? `bg-white/10 ${phaseColor}` 
                    : 'bg-[#1c1c1e]/80 border-white/5 opacity-80'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl mr-4 shrink-0 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-serif font-bold truncate ${completed ? 'text-white' : 'text-gray-400'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.prompt}</p>
                </div>
                {completed && (
                   <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
