import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DurationFormatPipe } from '../pipes/duration-format.pipe';
import { TrackService } from '../services/track';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-track-detail',
  imports: [DurationFormatPipe],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetail {
  id = input.required<number, string>({ transform: Number });

  private readonly service = inject(TrackService);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  protected readonly track = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        this.service.getTrack(id).pipe(catchError(() => of(null))),
      ),
    ),
  );

  goBack(): void {
    this.router.navigate(['/tracks']);
  }

  remove(): void {
    this.service.remove(this.id()).subscribe(() => {
      this.router.navigate(['/tracks']);
    });
  }
}
