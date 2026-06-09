import { Component, computed, input, output, signal } from '@angular/core';
import { Track } from '../../models/track.model';
import { TrackCardComponent } from '../track-card/track-card';

/** Critères possibles pour la recherche — union type TypeScript */
type SearchField = 'all' | 'title' | 'artist';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './track-list.html',
  styleUrl: './track-list.scss',
})
export class TrackListComponent {
  // F2 – input signal : reçoit le tableau de morceaux
  tracks = input<Track[]>([]);

  // F3 – id du morceau actuellement sélectionné (pour le badge)
  selectedTrackId = input<number | null>(null);

  // F3 – output signal : remonte le morceau cliqué vers le parent
  trackSelected = output<Track>();

  // F4 – signal mutable : terme saisi dans la barre de recherche
  protected searchTerm = signal('');

  // F4 – union type : champ sur lequel porte la recherche
  protected searchField = signal<SearchField>('all');

  // F4 – computed : recalcule automatiquement dès que searchTerm ou tracks change
  protected filteredTracks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.tracks();

    return this.tracks().filter((t) => {
      switch (this.searchField()) {
        case 'title':  return t.title.toLowerCase().includes(term);
        case 'artist': return t.artist.toLowerCase().includes(term);
        default:
          return (
            t.title.toLowerCase().includes(term) ||
            t.artist.toLowerCase().includes(term)
          );
      }
    });
  });
}
