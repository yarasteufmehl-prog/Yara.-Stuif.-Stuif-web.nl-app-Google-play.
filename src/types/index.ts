export type NavTab = 'home' | 'blogs' | 'videos' | 'menu';

export type SubView = 
  | null 
  | 'podcast' 
  | 'music' 
  | 'all-videos' 
  | 'about' 
  | 'gallery' 
  | 'tech' 
  | 'contact';

export type VideoCategory = 'vlogs' | 'muziek' | 'podcasts' | 'persoonlijk' | 'tech';

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  categoryLabel: string;
  duration: string;
  views: string;
  date: string;
  youtubeId?: string;
  description: string;
  tags: string[];
  color: {
    bg: string;
    text: string;
    border: string;
    button: string;
    hoverButton: string;
    gradient: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
  tags: string[];
  imageCaption?: string;
  accentColor: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string;
  date: string;
  description: string;
  audioDurationSeconds: number;
  topics: string[];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  durationSeconds: number;
  genre: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  description: string;
  bpm: number;
  color: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: 'portret' | 'award' | 'muziek' | 'studio' | 'zwolle';
  caption: string;
  aspectRatio: 'square' | 'wide' | 'tall';
  svgType: string;
  colors: string[];
}
