import React, { useState, useEffect } from 'react';
import { dataService } from './SERVICES/dataService';
import { Prompt, UserEntry, SongMetadata } from './types';
import { Modal } from './COMPONENTS/Modal';
import { MusicBar } from './COMPONENTS/MusicBar';
import { VideoModal } from './COMPONENTS/VideoModal';
import { Home } from './VIEWS/Home';
import { Dashboard } from './VIEWS/Dashboard';
import { DecemberDiamonds } from './VIEWS/DecemberDiamonds';
import { SleighAllDay } from './VIEWS/SleighAllDay';
import { FiercestThings } from './VIEWS/FiercestThings';
import { HolidayHeels } from './VIEWS/HolidayHeels';
import { ClausEffect } from './VIEWS/ClausEffect';
import { Grinchified } from './VIEWS/Grinchified';
import { songs } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [data, setData] = useState<UserEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [activeSong, setActiveSong] = useState('');
  
  // Music State
  const [currentMusic, setCurrentMusic] = useState<SongMetadata | null>(songs.december);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initial Data Load
  useEffect(() => {
    setData(dataService.getAll());
  }, []);

  const refreshData = () => {
    setData(dataService.getAll());
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenPrompt = (prompt: Prompt, song: string) => {
    setActivePrompt(prompt);
    setActiveSong(song);
    setModalOpen(true);
  };
  
  // Open existing entry for reading/editing
  const handleOpenEntry = (entry: UserEntry, prompt: Prompt) => {
    setActivePrompt(prompt);
    setActiveSong(entry.song);
    setModalOpen(true);
  };

  const handleSaveResponse = (response: string) => {
    if (activePrompt && activeSong) {
      const existing = data.find(d => d.song === activeSong && d.prompt_id === activePrompt.id);
      
      const entry: UserEntry = {
        song: activeSong,
        prompt_id: activePrompt.id,
        response: response,
        created_at: existing ? existing.created_at : new Date().toISOString()
      };

      if (existing) {
        dataService.update(entry);
      } else {
        dataService.create(entry);
      }
      refreshData();
    }
  };
  
  // Loads the song into the footer but DOES NOT auto-play
  const handleLoadSong = (song: SongMetadata) => {
    if (currentMusic?.id !== song.id) {
        setCurrentMusic(song);
        setIsPlaying(false);
    }
  };
  
  const handleTogglePlay = () => {
    if (currentMusic?.audioUrl) {
        setIsPlaying(!isPlaying);
    }
  };

  const handleWatchVideo = () => {
    if (currentMusic) {
        // Pause audio when watching video
        setIsPlaying(false);
        setVideoModalOpen(true);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard data={data} onNavigate={handleNavigate} onOpenEntry={handleOpenEntry} />;
      case 'december':
        return <DecemberDiamonds data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'december')} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      case 'sleigh':
        return <SleighAllDay data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'sleigh')} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      case 'fiercest':
        return <FiercestThings data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'fiercest')} onDataUpdate={refreshData} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      case 'heels':
        return <HolidayHeels data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'heels')} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      case 'claus':
        return <ClausEffect data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'claus')} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      case 'grinch':
        return <Grinchified data={data} onOpenPrompt={(p) => handleOpenPrompt(p, 'grinch')} onNavigate={() => handleNavigate('home')} onLoadSong={handleLoadSong} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const existingEntry = activePrompt 
    ? data.find(d => d.song === activeSong && d.prompt_id === activePrompt.id) 
    : undefined;

  return (
    <div className="min-h-screen font-sans text-white mx-auto max-w-md md:max-w-full md:border-x border-white/10 shadow-2xl bg-transparent relative">
      
      {/* View Container */}
      <main className="w-full h-full min-h-screen">
        {renderView()}
      </main>

      {/* Persistent Music Player */}
      <MusicBar 
        currentSong={currentMusic}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onWatchVideo={handleWatchVideo}
      />

      {/* Journal Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prompt={activePrompt}
        song={activeSong}
        existingEntry={existingEntry}
        onSave={handleSaveResponse}
      />

      {/* Video Modal */}
      <VideoModal 
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoId={currentMusic?.videoId || ''}
      />
    </div>
  );
};

export default App;
