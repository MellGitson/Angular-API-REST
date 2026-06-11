import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-form',
  imports: [FormsModule],
  templateUrl: './track-form.html',
  styleUrl: './track-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackForm implements OnInit {
  id = input<string | undefined>(undefined);

  private readonly trackService = inject(TrackService);
  private readonly router = inject(Router);

  protected title = signal('');
  protected artist = signal('');
  protected rating = signal(5);
  protected toastVisible = signal(false);
  protected toastMessage = signal('');

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.trackService.getTrack(Number(id)).subscribe((track) => {
        this.title.set(track.title);
        this.artist.set(track.artist);
        this.rating.set(track.rating);
      });
    }
  }

  protected save(): void {
    const payload: Omit<Track, 'id'> = {
      title: this.title(),
      artist: this.artist(),
      rating: this.rating(),
      album: '',
      genre: '',
      duration: 0,
      favorite: false,
      coverUrl: '',
      year: null,
    };

    const id = this.id();
    if (id) {
      this.trackService.update(Number(id), payload).subscribe(() => {
        this.showToast('Morceau modifié avec succès !');
        setTimeout(() => this.router.navigate(['/tracks']), 1500);
      });
    } else {
      this.trackService.create(payload).subscribe(() => {
        this.showToast('Morceau ajouté avec succès !');
        setTimeout(() => this.router.navigate(['/tracks']), 1500);
      });
    }
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }
}
