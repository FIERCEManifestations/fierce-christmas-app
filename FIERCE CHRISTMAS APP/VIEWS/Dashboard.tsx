
import React, { useState } from 'react';
import { UserEntry, Prompt } from '../types';
import { decemberPrompts, sleighPrompts, fiercestPrompts, heelsPrompts, clausPrompts, grinchPrompts } from '../constants';
import { NavBar } from '../COMPONENTS/NavBar';

interface DashboardProps {
  data: UserEntry[];
  onNavigate: (view: string) => void;
  onOpenEntry: (entry: UserEntry, prompt: Prompt) => void;
}

const SONG_TOTALS = {
  december: 12,
  sleigh: 10,
  fiercest: 10,
  heels: 10,
  claus: 10,
  grinch: 10
};

// Helper to find prompt details
const getPromptDetails = (song: string, id: number | string) => {
  const allPrompts = {
    december: decemberPrompts,
    sleigh: sleighPrompts,
    fiercest: fiercestPrompts,
    heels: heelsPrompts,
    claus: clausPrompts,
    grinch: grinchPrompts
  };
  // @ts-ignore
  return allPrompts[song]?.find(p => p.id === id);
};

export const Dashboard: React.FC<DashboardProps> = ({ data, onNavigate, onOpenEntry }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'journal'>('stats');

  const getProgress = (song: string) => {
    if (song === 'fiercest') {
        return data.filter(d => d.song === song && typeof d.prompt_id === 'number').length;
    }
    return data.filter(d => d.song === song).length;
  };

  const progress = {
    december: getProgress('december'),
    sleigh: getProgress('sleigh'),
    fiercest: getProgress('fiercest'),
    heels: getProgress('heels'),
    claus: getProgress('claus'),
    grinch: getProgress('grinch'),
  };

  const totalCompleted = Object.values(progress).reduce((a, b) => a + b, 0);
  const totalPrompts = 62;
  const overallPercent = Math.round((totalCompleted / totalPrompts) * 100);

  const shareProgress = () => {
    const shareText = `I'm on my FIERCE transformation journey! 🎄💎✨\n\nOverall: ${overallPercent}% Complete\n#FIERCEChristmas`;
    navigator.clipboard.writeText(shareText);
    alert('Copied to clipboard!');
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fierce-journal-backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleResetApp = () => {
    if (window.confirm("⚠️ ARE YOU SURE?\n\nThis will DELETE ALL your journal entries and progress permanently.\n\nThis cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Filter only reflection entries (not gratitude items)
  const journalEntries = data
    .filter(d => d.response && d.response.trim().length > 0)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="min-h-screen pb-safe bg-black/20">
      <NavBar 
        title="My Progress" 
        onBack={() => onNavigate('home')} 
        rightAction={
          <button onClick={shareProgress} className="text-purple-400 font-semibold text-sm">Share</button>
        }
      />

      {/* Toggle */}
      <div className="fixed top-16 left-0 right-0 z-30 px-6 pt-2">
         <div className="bg-black/20 backdrop-blur-xl p-1 rounded-xl flex border border-white/10 shadow-lg">
           <button 
             onClick={() => setActiveTab('stats')}
             className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'stats' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
           >
             Stats
           </button>
           <button 
             onClick={() => setActiveTab('journal')}
             className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'journal' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
           >
             My Journal
           </button>
         </div>
      </div>
      
      <div className="px-4 pt-36 pb-8">
        
        {activeTab === 'stats' ? (
          <div className="animate-slide-up">
            {/* Main Stats Card */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 text-center mb-6 border border-white/10 shadow-2xl">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-800" />
                  <circle 
                    cx="48" cy="48" r="42" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * overallPercent) / 100}
                    strokeLinecap="round"
                    className="text-purple-500 transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{overallPercent}%</span>
                </div>
              </div>
              <h2 className="text-xl font-serif font-bold text-white mb-0.5">Total Completion</h2>
              <p className="text-gray-400 text-sm">{totalCompleted} / {totalPrompts} Prompts</p>
            </div>

            {/* Detailed List */}
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Detailed Breakdown</h3>
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 mb-8">
              {[
                { key: 'december', name: 'December Diamond', icon: '💎', color: 'bg-blue-500' },
                { key: 'sleigh', name: 'Sleigh All Day', icon: '🛷', color: 'bg-amber-500' },
                { key: 'fiercest', name: 'A Few of My FIERCEST Things', icon: '✨', color: 'bg-green-500' },
                { key: 'heels', name: 'Holiday Heels', icon: '👠', color: 'bg-rose-500' },
                { key: 'claus', name: 'The Claus Effect', icon: '👑', color: 'bg-red-500' },
                { key: 'grinch', name: 'Grinch-ified', icon: '💚', color: 'bg-emerald-500' },
              ].map((item, index) => {
                  // @ts-ignore
                  const current = progress[item.key];
                  // @ts-ignore
                  const total = SONG_TOTALS[item.key];
                  const pct = (current / total) * 100;
                  
                  return (
                    <div 
                      key={item.key}
                      onClick={() => onNavigate(item.key)}
                      className={`flex items-center p-3 border-b border-white/5 last:border-0 hover:bg-white/5 active:bg-white/10 transition cursor-pointer`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg mr-3 animate-pulse-slow">
                        {item.icon}
                      </div>
                      <div className="flex-1 mr-3">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm text-white">{item.name}</span>
                          <span className="text-xs text-gray-400">{current}/{total}</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                      <div className="text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                      </div>
                    </div>
                  );
              })}
            </div>
            
            {/* BRANDED SECTION: About the Creator */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
                   <h3 className="text-lg font-serif font-bold text-yellow-200 mb-2">About FIERCE Manifestations</h3>
                   <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                     Transforming lives through music and manifestation. This journal is designed to accompany the "A FIERCE Christmas" album.
                   </p>
                   <a 
                     href="https://www.fiercemanifestations.com" 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-block px-6 py-2 bg-yellow-600/20 border border-yellow-500/40 rounded-full text-yellow-200 text-xs font-bold uppercase tracking-wider hover:bg-yellow-600/40 transition"
                   >
                     Visit Website
                   </a>
                </div>
            </div>

            {/* Data Management Section */}
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Settings & Data</h3>
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
               <button 
                 onClick={handleExportData}
                 className="w-full flex items-center p-4 border-b border-white/5 hover:bg-white/5 active:bg-white/10 text-left"
               >
                 <span className="text-xl mr-3">📥</span>
                 <div className="flex-1">
                   <h4 className="text-sm font-bold text-white">Backup My Journal</h4>
                   <p className="text-xs text-gray-400">Download your data as a file</p>
                 </div>
               </button>
               
               <button 
                 onClick={handleResetApp}
                 className="w-full flex items-center p-4 hover:bg-red-900/10 active:bg-red-900/20 text-left group"
               >
                 <span className="text-xl mr-3">⚠️</span>
                 <div className="flex-1">
                   <h4 className="text-sm font-bold text-red-400 group-hover:text-red-300">Reset App Data</h4>
                   <p className="text-xs text-red-500/60 group-hover:text-red-400/80">Delete everything and start over</p>
                 </div>
               </button>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up space-y-4">
             <div className="text-center mb-6">
                <p className="text-gray-400 text-sm italic">"Your saved reflections appear here"</p>
             </div>
             {journalEntries.map((entry, idx) => {
               const prompt = getPromptDetails(entry.song, entry.prompt_id);
               if (!prompt) return null;

               return (
                 <div 
                   key={idx}
                   onClick={() => onOpenEntry(entry, prompt)}
                   className="bg-black/20 backdrop-blur-xl p-5 rounded-2xl border border-white/10 active:scale-[0.98] transition-transform cursor-pointer"
                 >
                    <div className="flex items-start gap-3 mb-2">
                       <div className="text-2xl">{prompt.icon}</div>
                       <div>
                         <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                           {new Date(entry.created_at).toLocaleDateString()} • {entry.song.toUpperCase()}
                         </span>
                         <h4 className="text-white font-serif font-bold text-lg leading-tight">{prompt.title || prompt.month}</h4>
                       </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 pl-10 font-serif italic">
                      "{entry.response}"
                    </p>
                 </div>
               );
             })}

             {journalEntries.length === 0 && (
               <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                 <div className="text-4xl mb-4 grayscale opacity-50">📝</div>
                 <h3 className="text-gray-400 font-bold">No entries yet</h3>
                 <p className="text-gray-500 text-sm mt-2">Start a journey to begin writing.</p>
               </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};
