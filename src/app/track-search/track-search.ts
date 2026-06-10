import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TrackCardComponent } from '../components/track-card/track-card';
import { Track } from '../models/track.model';
import { TrackService } from '../services/track';

@Component({
  selector: 'app-track-search',
  imports: [TrackCardComponent],
  templateUrl: './track-search.html',
  styleUrl: './track-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackSearch {
  private readonly service = inject(TrackService);

  protected readonly term = signal('');

  protected readonly results = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) =>
        this.service.search(q).pipe(catchError(() => of([] as Track[]))),
      ),
    ),
    { initialValue: [] as Track[] },
  );
}
