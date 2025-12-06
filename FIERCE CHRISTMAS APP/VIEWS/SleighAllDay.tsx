import React, { useEffect } from 'react';
import { sleighPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { NavBar } from '../components/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

export const SleighAllDay: React.FC<Props> = ({ data, onOpenPrompt, onNavigate, onLoadSong }) => {
  const isCompleted = (id: number | string) => data.some(d => d.song === 'sleigh' && d.prompt_id === id);

  useEffect(() => {
    onLoadSong(songs.sleigh);
  }, [onLoadSong]);

  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="Sleigh All Day" 
        onBack={onNavigate} 
        transparent 
      />

      <div className="pt-24 px-4 pb-8">
        <div className="mb-8 text-center px-6">
          <div className="inline-block p-4 rounded-full bg-amber-500/10 mb-4 ring-1 ring-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <div className="text-5xl animate-wiggle">🛷</div>
          </div>
          <p className="text-amber-200 text-lg font-serif italic">"Hustle to Luxury"</p>
        </div>

        <div className="space-y-3">
          {sleighPrompts.map((item, index) => {
            const completed = isCompleted(item.id);
            return (
              <div 
                key={index}
                onClick={() => onOpenPrompt(item)}
                className={`group flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${
                  completed 
                    ? 'bg-amber-900/20 border-amber-500/30' 
                    : 'bg-[#1c1c1e]/80 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 transition-transform group-hover:scale-110 ${completed ? 'bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-white/5'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-serif font-bold truncate ${completed ? 'text-amber-100' : 'text-gray-200'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.prompt}</p>
                </div>
                <div className="shrink-0 ml-2">
                   {completed ? (
                     <span className="text-amber-500 text-xs font-bold uppercase tracking-wider border border-amber-500/50 rounded px-2 py-1 animate-scale-in">Done</span>
                   ) : (
                     <div className="w-2 h-2 rounded-full bg-gray-600"></div>
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

