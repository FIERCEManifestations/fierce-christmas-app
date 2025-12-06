export interface Prompt {
  id: number | string;
  icon: string;
  title?: string;
  month?: string; // For December
  prompt: string;
}

export interface UserEntry {
  id?: string;
  song: string;
  prompt_id: number | string;
  response?: string;
  text?: string; // For gratitude items
  created_at: string;
  updated_at?: string;
}

export interface SongMetadata {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string; // The full link (fallback)
  videoId?: string;   // The ID for the embedded player (e.g., "dQw4w9WgXcQ")
  audioUrl?: string;  // Link to an .mp3 file
}

export interface SongStats {
  song: string;
  total: number;
  completed: number;
}
