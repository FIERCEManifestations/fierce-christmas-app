import React, { useState, useEffect, useRef } from 'react';
import { SongMetadata } from '../types';

interface MusicBarProps {
  currentSong: SongMetadata | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onWatchVideo: () => void;
}

export const MusicBar: React.FC<MusicBarProps> = ({ currentSong, isPlaying, onTogglePlay, onWatchVideo }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Handle song changes and playback
  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play blocked (needs user interaction first):", error);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-slide-up"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', paddingTop: '12px' }}
    >
      <div className="px-4 flex items-center justify-between w-full max-w-4xl mx-auto">
        {/* Hidden Audio Element */}
        {currentSong.audioUrl && (
            <audio 
                ref={audioRef} 
                src={currentSong.audioUrl} 
                loop 
                preload="none"
            />
        )}

        {/* Left Side: Album Art & Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
            {/* Album Art */}
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}>
              <span className="text-2xl filter drop-shadow">💿</span>
            </div>

            {/* Song Info */}
            <div className="min-w-0 flex-col justify-center">
                <h4 className="text-white text-sm font-bold truncate font-serif leading-tight">{currentSong.title}</h4>
                <p className="text-gray-400 text-[10px] truncate font-sans uppercase tracking-wider">{currentSong.artist}</p>
            </div>
        </div>
            
        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
             <button 
                onClick={onWatchVideo}
                className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-xl px-3 py-1.5 transition active:scale-95 border border-white/5 min-w-[60px]"
              >
                <span className="text-lg leading-none mb-1">📺</span>
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wide">Watch</span>
              </button>

              <button 
                onClick={onTogglePlay}
                disabled={!currentSong.audioUrl}
                className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition active:scale-95 border border-white/5 min-w-[60px] ${
                    !currentSong.audioUrl 
                      ? 'bg-white/5 opacity-50 cursor-not-allowed' 
                      : isPlaying 
                         ? 'bg-purple-600/20 border-purple-500/50' 
                         : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className="text-lg leading-none mb-1">{isPlaying ? '⏸' : '▶️'}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wide ${isPlaying ? 'text-purple-300' : 'text-gray-300'}`}>
                    {isPlaying ? 'Playing' : 'Listen'}
                </span>
              </button>
        </div>
      </div>
      
      {/* Progress Bar (Visual Only for Audio) */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-800">
         <div 
           className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ${isPlaying ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
           style={{ transitionDuration: '30s', transitionTimingFunction: 'linear' }}
         ></div>
      </div>
    </div>
  );
};
