import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { TrackService } from '../services/track';
import { TrackCardComponent } from '../components/track-card/track-card';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-favorites',
  imports: [TrackCardComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {
  private readonly trackService = inject(TrackService);

  private readonly reload = signal(0);

  protected readonly tracks = toSignal(
    toObservable(this.reload).pipe(switchMap(() => this.trackService.getTracks())),
    { initialValue: [] },
  );

  protected readonly favorites = computed(() => this.tracks().filter((t) => t.favorite));

  protected onToggleFavorite(track: Track): void {
    this.trackService.update(track.id, { favorite: !track.favorite }).subscribe(() => {
      this.reload.update((n) => n + 1);
    });
  }
}
