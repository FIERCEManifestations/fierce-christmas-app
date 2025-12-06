import React, { useEffect } from 'react';
import { decemberPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { NavBar } from '../COMPONENTS/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

export const DecemberDiamonds: React.FC<Props> = ({ data, onOpenPrompt, onNavigate, onLoadSong }) => {
  const isCompleted = (id: number | string) => data.some(d => d.song === 'december' && d.prompt_id === id);

  useEffect(() => {
    onLoadSong(songs.december);
  }, [onLoadSong]);

  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="December Diamond" 
        onBack={onNavigate}
        transparent={true}
      />

      <div className="pt-24 px-4 pb-8">
        <div className="mb-8 text-center px-6">
          <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4 ring-1 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <div className="text-5xl animate-float">💎</div>
          </div>
          <p className="text-blue-200 text-lg font-serif italic">"12 gemstones of transformation"</p>
        </div>

        <div className="space-y-3">
          {decemberPrompts.map((item, index) => {
            const completed = isCompleted(item.id);
            return (
              <div 
                key={index}
                onClick={() => onOpenPrompt(item)}
                className={`group flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${
                  completed 
                    ? 'bg-blue-900/20 border-blue-500/30' 
                    : 'bg-[#1c1c1e]/80 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 transition-transform group-hover:scale-110 ${completed ? 'bg-blue-500/20 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-gray-400'}`}>
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-serif font-bold truncate ${completed ? 'text-blue-100' : 'text-gray-200'}`}>
                    {item.month}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5 pr-2">
                    {item.prompt}
                  </p>
                </div>

                <div className="shrink-0">
                   {completed ? (
                     <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-scale-in">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white"><path d="M20 6L9 17l-5-5"/></svg>
                     </div>
                   ) : (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M9 18l6-6-6-6"/></svg>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
