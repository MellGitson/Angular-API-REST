export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number; // secondes
  rating: number;   // 0–5
  favorite: boolean;
}
