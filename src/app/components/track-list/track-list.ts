import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackService } from '../../services/track';
import { TrackCardComponent } from '../track-card/track-card';

type SearchField = 'all' | 'title' | 'artist';

@Component({
  selector: 'app-track-list',
  imports: [TrackCardComponent],
  templateUrl: './track-list.html',
  styleUrl: './track-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  private readonly trackService = inject(TrackService);

  protected readonly tracks = toSignal(this.trackService.getTracks(), { initialValue: [] });
  protected searchTerm = signal('');
  protected searchField = signal<SearchField>('all');

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
