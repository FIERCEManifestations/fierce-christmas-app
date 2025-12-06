import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-scale-in">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      {/* Video Container */}
      <div className="w-full max-w-4xl aspect-video px-4">
        {videoId ? (
            <iframe 
                className="w-full h-full rounded-2xl shadow-2xl border border-white/10"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>
        ) : (
            <div className="w-full h-full bg-black/50 rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                <span className="text-4xl mb-4">📺</span>
                <h3 className="text-xl font-bold text-white mb-2">Video Not Available</h3>
                <p className="text-gray-400">Please add a Video ID to constants.ts</p>
                <button onClick={onClose} className="mt-4 px-6 py-2 bg-white/10 rounded-full text-sm">Close</button>
            </div>
        )}
      </div>
    </div>
  );
};
