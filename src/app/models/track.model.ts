export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number; // secondes
  rating: number;   // 0-10
  favorite: boolean;
  coverUrl: string;
  year: number | null;
}
