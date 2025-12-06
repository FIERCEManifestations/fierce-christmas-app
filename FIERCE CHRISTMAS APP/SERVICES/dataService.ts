import { UserEntry } from '../types';

const STORAGE_KEY = 'fierce-journal-data';

export const dataService = {
  getAll: (): UserEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get data', e);
      return [];
    }
  },

  create: (entry: UserEntry): UserEntry => {
    const all = dataService.getAll();
    const newEntry = { ...entry, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    all.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return newEntry;
  },

  update: (entry: UserEntry): UserEntry => {
    const all = dataService.getAll();
    const index = all.findIndex(e => e.song === entry.song && e.prompt_id === entry.prompt_id);
    if (index >= 0) {
      all[index] = { ...all[index], ...entry, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return all[index];
    }
    return entry;
  },

  delete: (entry: UserEntry) => {
    const all = dataService.getAll();
    const filtered = all.filter(e => !(e.song === entry.song && e.prompt_id === entry.prompt_id && e.created_at === entry.created_at));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // New method to bulk delete only ornaments for a specific song
  removeOrnaments: (song: string) => {
    const all = dataService.getAll();
    // Keep entries if:
    // 1. It's a different song
    // 2. OR it's a 'gratitude' list item (we only want to delete ornaments)
    const filtered = all.filter(e => e.song !== song || e.prompt_id === 'gratitude');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
