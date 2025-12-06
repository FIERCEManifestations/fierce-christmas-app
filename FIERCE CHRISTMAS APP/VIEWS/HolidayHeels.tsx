import React, { useEffect } from 'react';
import { heelsPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { NavBar } from '../components/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

export const HolidayHeels: React.FC<Props> = ({ data, onOpenPrompt, onNavigate, onLoadSong }) => {
  const isCompleted = (id: number | string) => data.some(d => d.song === 'heels' && d.prompt_id === id);

  useEffect(() => {
    onLoadSong(songs.heels);
  }, [onLoadSong]);

  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="Holiday Heels" 
        onBack={onNavigate} 
        transparent 
      />

      <div className="pt-24 px-4 pb-8">
        <div className="mb-8 text-center px-6">
          <div className="inline-block p-4 rounded-full bg-pink-500/10 mb-4 ring-1 ring-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
            <div className="text-5xl animate-float">👠</div>
          </div>
          <p className="text-pink-200 text-lg font-serif italic">"Walk Your Confidence Runway"</p>
        </div>

        {/* Progress Strip */}
        <div className="flex justify-between px-2 mb-6">
           {heelsPrompts.map((_, i) => (
             <div 
               key={i}
               className={`h-1 flex-1 mx-0.5 rounded-full transition-all duration-500 ${isCompleted(i) ? 'bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]' : 'bg-gray-800'}`}
             />
           ))}
        </div>

        <div className="space-y-3">
          {heelsPrompts.map((item, index) => {
            const completed = isCompleted(item.id);
            return (
              <div 
                key={index}
                onClick={() => onOpenPrompt(item)}
                className={`group flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${
                  completed 
                    ? 'bg-pink-900/20 border-pink-500/30' 
                    : 'bg-[#1c1c1e]/80 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 transition-transform group-hover:scale-110 ${completed ? 'bg-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-white/5'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-serif font-bold truncate ${completed ? 'text-pink-100' : 'text-gray-200'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.prompt}</p>
                </div>
                <div className="shrink-0 ml-2">
                   {completed ? <span className="text-pink-500 text-lg animate-scale-in">✓</span> : <span className="text-gray-600">→</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
