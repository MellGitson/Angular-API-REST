import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { TrackFormComponent, TrackFormValue } from '../components/track-form/track-form';
import { TrackListComponent } from '../components/track-list/track-list';
import { Track } from '../models/track.model';
import { AuthService } from '../services/auth';
import { TrackService } from '../services/track';

@Component({
  selector: 'app-home',
  imports: [TrackFormComponent, TrackListComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly trackService = inject(TrackService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly refresh$ = new Subject<void>();

  readonly loading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  selectedTrack = signal<Track | null>(null);

  protected readonly tracks = toSignal(
    this.refresh$.pipe(
      startWith(undefined as void),
      tap(() => { this.loading.set(true); this.errorMessage.set(null); }),
      switchMap(() =>
        this.trackService.getTracks().pipe(
          finalize(() => this.loading.set(false)),
          catchError((error: unknown) => {
            this.errorMessage.set(this.toErrorMessage(error, 'Impossible de charger les morceaux.'));
            return of([] as Track[]);
          }),
        ),
      ),
    ),
    { initialValue: [] as Track[] },
  );

  get selectedTrackId(): number | null {
    return this.selectedTrack()?.id ?? null;
  }

  onTrackSelected(track: Track): void {
    this.selectedTrack.set(track);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTrackSaved(value: TrackFormValue): void {
    this.errorMessage.set(null);

    if (value.id !== null) {
      this.trackService
        .updateTrack(value.id, { title: value.title, artist: value.artist, rating: value.rating })
        .subscribe({
          next: (updatedTrack) => {
            this.selectedTrack.set(updatedTrack);
            this.refresh$.next();
          },
          error: (error: unknown) => {
            this.errorMessage.set(this.toErrorMessage(error, 'Impossible de modifier le morceau.'));
          },
        });
      return;
    }

    this.trackService
      .createTrack({ title: value.title, artist: value.artist, rating: value.rating })
      .subscribe({
        next: (newTrack) => {
          this.selectedTrack.set(newTrack);
          this.refresh$.next();
        },
        error: (error: unknown) => {
          this.errorMessage.set(this.toErrorMessage(error, "Impossible d'ajouter le morceau."));
        },
      });
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 || error.status === 403) {
        return 'Action non autorisée : connecte-toi avec ton compte demo.';
      }
      if (typeof error.error === 'object' && error.error && 'message' in error.error) {
        const message = error.error['message'];
        if (typeof message === 'string' && message.trim()) return message;
      }
      if (error.message) return error.message;
    }
    return fallback;
  }
}
