// Add YouTube videos here — the id is the part after "v=" in the URL
// (https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ").
// The newest video should go first; it is featured at the top of the Music page.
//
// Example:
// { id: "dQw4w9WgXcQ", title: "Live at Rock Night (Cover)", date: "2026-11-21" },

export type Video = {
  id: string;
  title: string;
  date?: string; // YYYY-MM-DD, optional
};

export const videos: Video[] = [];
