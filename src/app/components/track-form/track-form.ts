import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import { Track } from '../../models/track.model';

export interface TrackFormValue {
  id: number | null;
  title: string;
  artist: string;
  rating: number;
}

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackFormComponent {
  trackToEdit = input<Track | null>(null);
  saveTrack = output<TrackFormValue>();

  protected model = signal<TrackFormValue>({
    id: null,
    title: '',
    artist: '',
    rating: 5,
  });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0, { message: 'La note minimale est 0' });
    max(path.rating, 10, { message: 'La note maximale est 10' });
  });

  constructor() {
    effect(() => {
      const track = this.trackToEdit();
      if (!track) {
        return;
      }

      this.model.set({
        id: track.id,
        title: track.title,
        artist: track.artist,
        rating: track.rating,
      });
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.trackForm().valid()) {
      return;
    }

    this.saveTrack.emit(this.model());

    if (this.model().id !== null) {
      return;
    }

    this.model.set({
      id: null,
      title: '',
      artist: '',
      rating: 5,
    });
  }

  protected onReset(): void {
    this.model.set({
      id: null,
      title: '',
      artist: '',
      rating: 5,
    });
  }
}