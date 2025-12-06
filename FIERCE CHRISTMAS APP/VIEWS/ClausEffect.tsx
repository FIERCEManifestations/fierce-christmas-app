import React, { useEffect } from 'react';
import { clausPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { NavBar } from '../components/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

export const ClausEffect: React.FC<Props> = ({ data, onOpenPrompt, onNavigate, onLoadSong }) => {
  const isCompleted = (id: number | string) => data.some(d => d.song === 'claus' && d.prompt_id === id);
  const completedCount = clausPrompts.filter(p => isCompleted(p.id)).length;
  
  useEffect(() => {
    onLoadSong(songs.claus);
  }, [onLoadSong]);
  
  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="The Claus Effect" 
        onBack={onNavigate} 
        transparent 
      />

      <div className="pt-24 px-4 pb-8">
        
        {/* Header Card */}
        <div className="bg-gradient-to-br from-red-900/60 to-red-950/60 backdrop-blur-md rounded-3xl p-6 border border-red-500/30 mb-8 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-4 -top-4 text-9xl opacity-10 rotate-12 animate-pulse-slow">👑</div>
          <h2 className="text-2xl font-serif font-bold text-white mb-1">Masterclass Progress</h2>
          <p className="text-red-200 text-sm mb-4">{completedCount} of 10 Lessons Complete</p>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
             <div className="h-full bg-red-500 transition-all duration-500 relative" style={{ width: `${(completedCount/10)*100}%` }}>
               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
             </div>
          </div>
        </div>

        <div className="space-y-3">
          {clausPrompts.map((item, index) => {
            const completed = isCompleted(item.id);
            return (
              <div 
                key={index}
                onClick={() => onOpenPrompt(item)}
                className={`relative overflow-hidden flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer group ${
                  completed 
                    ? 'bg-red-900/10 border-red-500/30' 
                    : 'bg-[#1c1c1e]/80 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 z-10 transition-transform group-hover:scale-110 ${completed ? 'bg-red-500/20 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-white/5 text-gray-500'}`}>
                  {completed ? '✓' : index + 1}
                </div>
                
                <div className="flex-1 min-w-0 z-10">
                  <h3 className={`font-serif font-bold truncate ${completed ? 'text-red-100' : 'text-gray-200'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.prompt}</p>
                </div>
                
                {completed && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-900/20 pointer-events-none"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
