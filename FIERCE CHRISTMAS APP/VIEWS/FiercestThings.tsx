
import React, { useState, useEffect } from 'react';
import { fiercestPrompts, songs } from '../constants';
import { Prompt, UserEntry, SongMetadata } from '../types';
import { dataService } from '../services/dataService';
import { NavBar } from '../components/NavBar';

interface Props {
  data: UserEntry[];
  onOpenPrompt: (prompt: Prompt) => void;
  onDataUpdate: () => void;
  onNavigate: () => void;
  onLoadSong: (song: SongMetadata) => void;
}

// Hardcoded positions to form a perfect pyramid inside the triangle
// Coordinates are % relative to the container
const ORNAMENT_POSITIONS = [
  { top: '18%', left: '50%' }, // Row 1 (1 item)
  
  { top: '35%', left: '42%' }, // Row 2 (2 items)
  { top: '35%', left: '58%' },
  
  { top: '52%', left: '34%' }, // Row 3 (3 items)
  { top: '52%', left: '50%' },
  { top: '52%', left: '66%' },
  
  { top: '70%', left: '26%' }, // Row 4 (4 items)
  { top: '70%', left: '42%' },
  { top: '70%', left: '58%' },
  { top: '70%', left: '74%' },
];

export const FiercestThings: React.FC<Props> = ({ data, onOpenPrompt, onDataUpdate, onNavigate, onLoadSong }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'list'>('tree');
  const [gratitudeInput, setGratitudeInput] = useState('');

  // Check using string comparison for robustness (data can come from localstorage as strings)
  const isCompleted = (id: number | string) => {
    return data.some(d => d.song === 'fiercest' && String(d.prompt_id) === String(id));
  };
  
  const gratitudeItems = data.filter(d => d.song === 'fiercest' && d.prompt_id === 'gratitude');

  useEffect(() => {
    onLoadSong(songs.fiercest);
  }, [onLoadSong]);

  const handleAddGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeInput.trim()) return;

    if (gratitudeItems.length >= 999) {
      alert('Maximum limit reached');
      return;
    }

    const newItem: UserEntry = {
      song: 'fiercest',
      prompt_id: 'gratitude',
      text: gratitudeInput,
      created_at: new Date().toISOString()
    };

    dataService.create(newItem);
    setGratitudeInput('');
    onDataUpdate();
  };

  const deleteGratitude = (item: UserEntry) => {
    dataService.delete(item);
    onDataUpdate();
  };

  const handleClearTree = () => {
    if (window.confirm("Are you sure you want to clear your tree and start over? This will remove all ornaments.")) {
      dataService.removeOrnaments('fiercest');
      onDataUpdate();
      alert("Tree cleared!");
      window.location.reload(); // Force full reload to ensure UI sync
    }
  };

  return (
    <div className="min-h-screen bg-black/10 pb-safe-music">
      <NavBar 
        title="A Few of My FIERCEST Things" 
        onBack={onNavigate} 
        transparent 
      />
      
      <div className="pt-24 px-4 pb-8">
        
        {/* Tab Switcher */}
        <div className="mb-6 px-2">
            <div className="bg-black/20 backdrop-blur-md p-1 rounded-xl flex border border-white/10 shadow-lg">
                <button 
                    onClick={() => setActiveTab('tree')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === 'tree' 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    View Tree
                </button>
                <button 
                    onClick={() => setActiveTab('list')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === 'list' 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    View List
                </button>
            </div>
        </div>
        
        {activeTab === 'tree' ? (
            /* Tree Section */
            <div className="animate-scale-in flex flex-col items-center mb-12">
                <div className="text-center mb-6">
                    <h3 className="text-green-300 font-serif text-lg">Decorate Your Tree</h3>
                    <p className="text-gray-400 text-xs">Complete prompts to hang ornaments!</p>
                </div>

                {/* The Visual Tree Container */}
                <div className="relative w-full max-w-[280px] aspect-[4/5] flex items-center justify-center mt-4">
                    
                    {/* Tree Shape (Background) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-700 via-green-800 to-green-900 clip-path-tree opacity-90 backdrop-blur-sm shadow-2xl z-0"></div>
                    
                    {/* Star Top */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl filter drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse-slow z-20">
                        🌟
                    </div>

                    {/* Ornaments - Absolute Positioned within the SAME container as background */}
                    <div className="absolute inset-0 z-10">
                        {fiercestPrompts.map((item, index) => {
                            const active = isCompleted(item.id);
                            const pos = ORNAMENT_POSITIONS[index] || { top: '50%', left: '50%' };
                            
                            return (
                                <div 
                                    key={index} 
                                    onClick={() => onOpenPrompt(item)}
                                    className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center cursor-pointer transition-all duration-500"
                                    style={{ top: pos.top, left: pos.left }}
                                >
                                    <div className={`w-full h-full rounded-full flex items-center justify-center text-lg border transition-all transform hover:scale-110 ${
                                        active 
                                        ? 'bg-red-600/90 border-yellow-400 shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-wiggle' 
                                        : 'bg-white/10 border-white/5 opacity-30 scale-75'
                                    }`}>
                                        {active ? item.icon : '?'}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    {/* Trunk */}
                    <div className="absolute -bottom-4 w-12 h-6 bg-amber-900 rounded-sm"></div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mt-12 w-full border border-white/5 mb-6">
                    <p className="text-center text-sm text-gray-400 italic">
                        "Tap a faded ornament to unlock it."
                    </p>
                </div>
            </div>
        ) : (
            /* Gratitude List Section */
            <div className="animate-slide-up">
                <div className="mb-4 pl-2">
                    <h3 className="text-xl font-serif text-white">My Gratitude List</h3>
                    <p className="text-xs text-gray-400">Add things you are thankful for.</p>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/5 mb-6 shadow-xl">
                    <form onSubmit={handleAddGratitude} className="flex gap-2">
                        <input 
                            type="text" 
                            value={gratitudeInput}
                            onChange={e => setGratitudeInput(e.target.value)}
                            placeholder="I am grateful for..."
                            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-green-600 hover:bg-green-500 transition rounded-xl w-12 flex items-center justify-center text-white text-xl shadow-lg">
                            +
                        </button>
                    </form>
                </div>

                <div className="space-y-2">
                    {gratitudeItems.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl animate-scale-in shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="text-green-400 animate-pulse-slow">✨</span>
                                <span className="text-gray-200 font-serif">{item.text}</span>
                            </div>
                            <button onClick={() => deleteGratitude(item)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white/5 rounded-full transition">
                                ×
                            </button>
                        </div>
                    ))}
                    {gratitudeItems.length === 0 && (
                        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                            <div className="text-4xl mb-3 opacity-30">📝</div>
                            <p className="text-gray-500">No items yet. Start your list!</p>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
      
      <style>{`
        .clip-path-tree {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};
