import { Component, signal } from '@angular/core';
import { Track } from './models/track.model';
import { TrackListComponent } from './components/track-list/track-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrackListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Données mock – J3 : remplacées par un appel HTTP à music-api
  readonly tracks: Track[] = [
    { id: 1, title: 'Bohemian Rhapsody',   artist: 'Queen',         album: 'A Night at the Opera', genre: 'Rock',   duration: 354, rating: 5, favorite: true  },
    { id: 2, title: 'Hotel California',    artist: 'Eagles',        album: 'Hotel California',      genre: 'Rock',   duration: 391, rating: 4, favorite: false },
    { id: 3, title: 'Stairway to Heaven',  artist: 'Led Zeppelin',  album: 'Led Zeppelin IV',       genre: 'Rock',   duration: 482, rating: 5, favorite: true  },
    { id: 4, title: 'Superstition',        artist: 'Stevie Wonder', album: 'Talking Book',          genre: 'Soul',   duration: 245, rating: 4, favorite: false },
    { id: 5, title: "What's Going On",     artist: 'Marvin Gaye',   album: "What's Going On",       genre: 'Soul',   duration: 233, rating: 4, favorite: true  },
    { id: 6, title: 'Smells Like Teen Spirit', artist: 'Nirvana',   album: 'Nevermind',             genre: 'Grunge', duration: 301, rating: 5, favorite: false },
  ];

  // F3 – signal qui stocke le morceau sélectionné (null = aucun)
  selectedTrack = signal<Track | null>(null);

  onTrackSelected(track: Track): void {
    this.selectedTrack.set(track);
  }

  // Utilitaires d'affichage pour le panneau de détail
  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  formatRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
