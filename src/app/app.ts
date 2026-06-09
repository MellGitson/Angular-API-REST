import { Component, signal } from '@angular/core';
import { TrackFormComponent, TrackFormValue } from './components/track-form/track-form';
import { Track } from './models/track.model';
import { TrackListComponent } from './components/track-list/track-list';

@Component({
  selector: 'app-root',
  imports: [TrackFormComponent, TrackListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Données mock – J3 : remplacées par un appel HTTP à music-api
  readonly tracks = signal<Track[]>([
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', duration: 200, rating: 9, favorite: true, coverUrl: 'https://picsum.photos/seed/arch/200/160' },
    { id: 2, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", genre: 'Pop', duration: 167, rating: 8, favorite: false, coverUrl: 'https://picsum.photos/seed/workspace/200/160' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', duration: 203, rating: 8, favorite: false, coverUrl: 'https://picsum.photos/seed/waterfall/200/160' },
    { id: 4, title: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep', genre: 'Pop', duration: 194, rating: 9, favorite: true, coverUrl: 'https://picsum.photos/seed/strawberry/200/160' },
    { id: 5, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', duration: 215, rating: 7, favorite: false, coverUrl: 'https://picsum.photos/seed/diver/200/160' },
    { id: 6, title: "Don't Start Now", artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', duration: 183, rating: 7, favorite: false, coverUrl: 'https://picsum.photos/seed/vintage/200/160' },
  ]);

  // F3 – signal qui stocke le morceau sélectionné (null = aucun)
  selectedTrack = signal<Track | null>(null);

  get selectedTrackId(): number | null {
    return this.selectedTrack()?.id ?? null;
  }

  onTrackSelected(track: Track): void {
    this.selectedTrack.set(track);
  }

  onTrackSaved(value: TrackFormValue): void {
    if (value.id !== null) {
      this.tracks.update((tracks) =>
        tracks.map((track) =>
          track.id === value.id
            ? {
                ...track,
                title: value.title,
                artist: value.artist,
                rating: value.rating,
              }
            : track,
        ),
      );

      const updatedTrack = this.tracks().find((track) => track.id === value.id) ?? null;
      this.selectedTrack.set(updatedTrack);
      return;
    }

    const newTrack: Track = {
      id: this.nextTrackId(),
      title: value.title,
      artist: value.artist,
      rating: value.rating,
      album: 'Single',
      genre: 'Pop',
      duration: 0,
      favorite: value.rating >= 9,
      coverUrl: `https://picsum.photos/seed/${encodeURIComponent(value.title)}/200/160`,
    };

    this.tracks.update((tracks) => [newTrack, ...tracks]);
    this.selectedTrack.set(newTrack);
  }

  private nextTrackId(): number {
    return this.tracks().reduce((max, track) => Math.max(max, track.id), 0) + 1;
  }
}
