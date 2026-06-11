import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TrackService } from '../../services/track';
import { TrackCardComponent } from '../track-card/track-card';
import { Track } from '../../models/track.model';

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

  private readonly reload = signal(0);

  protected readonly tracks = toSignal(
    toObservable(this.reload).pipe(switchMap(() => this.trackService.getTracks())),
    { initialValue: [] },
  );

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

  protected onToggleFavorite(track: Track): void {
    this.trackService.update(track.id, { favorite: !track.favorite }).subscribe(() => {
      this.reload.update((n) => n + 1);
    });
  }
}
