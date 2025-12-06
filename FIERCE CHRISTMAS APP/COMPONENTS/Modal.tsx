import React, { useState, useEffect } from 'react';
import { Prompt, UserEntry } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: Prompt | null;
  song: string;
  existingEntry?: UserEntry;
  onSave: (response: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, prompt, existingEntry, onSave }) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (isOpen && prompt) {
      setResponse(existingEntry?.response || '');
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen, prompt, existingEntry]);

  if (!isOpen || !prompt) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    setStatus('saving');
    setTimeout(() => {
        onSave(response);
        setStatus('saved');
        
        // Trigger Confetti!
        // @ts-ignore
        if (window.confetti) {
            // @ts-ignore
            window.confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF0000', '#00FF00', '#FFFFFF'],
                disableForReducedMotion: true
            });
        }

        setTimeout(() => {
            onClose();
        }, 600);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div className="relative w-full sm:max-w-xl bg-[#1c1c1e] sm:rounded-2xl rounded-t-3xl shadow-2xl animate-slide-up flex flex-col max-h-[85vh] border-t border-white/10 sm:border-none">
        
        {/* Handle Bar (Mobile Visual Cue) */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden" onClick={onClose}>
          <div className="w-10 h-1 bg-gray-600 rounded-full opacity-50"></div>
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center gap-3 border-b border-white/5 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">
            {prompt.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold font-serif text-white truncate">
              {prompt.title || prompt.month}
            </h3>
            <p className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">Journal Entry</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-700"
          >
            ×
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="px-5 py-4 overflow-y-auto flex-1 overscroll-contain">
          <p className="text-gray-300 mb-4 text-base font-serif leading-relaxed italic border-l-2 border-purple-500 pl-3">
            {prompt.prompt}
          </p>
          
          <form id="modal-form" onSubmit={handleSubmit} className="flex flex-col">
            <textarea
              className="w-full min-h-[120px] p-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-500 text-base leading-relaxed resize-none"
              placeholder="Start writing..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
              style={{ fontSize: '16px' }} 
            />
          </form>
        </div>

        {/* Action Bar */}
        <div className="p-4 border-t border-white/5 bg-[#1c1c1e] shrink-0 sm:rounded-b-2xl pb-safe">
          <button
            form="modal-form"
            type="submit"
            disabled={status !== 'idle'}
            className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all transform active:scale-[0.98] ${
                status === 'saved' 
                ? 'bg-green-600' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/40'
            }`}
          >
            {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved! 🎉' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  );
};
