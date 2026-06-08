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
    { id: 1, title: 'Blinding Lights',  artist: 'The Weeknd',    album: 'After Hours',            genre: 'Pop',  duration: 200, rating: 5, favorite: true,  coverUrl: 'https://picsum.photos/seed/arch/200/160'        },
    { id: 2, title: 'As It Was',        artist: 'Harry Styles',  album: "Harry's House",           genre: 'Pop',  duration: 167, rating: 4, favorite: false, coverUrl: 'https://picsum.photos/seed/workspace/200/160'   },
    { id: 3, title: 'Levitating',       artist: 'Dua Lipa',      album: 'Future Nostalgia',       genre: 'Pop',  duration: 203, rating: 4, favorite: false, coverUrl: 'https://picsum.photos/seed/waterfall/200/160'   },
    { id: 4, title: 'Bad Guy',          artist: 'Billie Eilish', album: 'When We All Fall Asleep', genre: 'Pop',  duration: 194, rating: 5, favorite: true,  coverUrl: 'https://picsum.photos/seed/strawberry/200/160'  },
    { id: 5, title: 'Save Your Tears',  artist: 'The Weeknd',    album: 'After Hours',            genre: 'Pop',  duration: 215, rating: 4, favorite: false, coverUrl: 'https://picsum.photos/seed/diver/200/160'       },
    { id: 6, title: "Don't Start Now", artist: 'Dua Lipa',      album: 'Future Nostalgia',       genre: 'Pop',  duration: 183, rating: 4, favorite: false, coverUrl: 'https://picsum.photos/seed/vintage/200/160'     },
  ];

  // F3 – signal qui stocke le morceau sélectionné (null = aucun)
  selectedTrack = signal<Track | null>(null);

  get selectedTrackId(): number | null {
    return this.selectedTrack()?.id ?? null;
  }

  onTrackSelected(track: Track): void {
    this.selectedTrack.set(track);
  }
}
