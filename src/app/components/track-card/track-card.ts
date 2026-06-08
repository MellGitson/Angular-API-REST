import { Component, input, output } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
})
export class TrackCardComponent {
  // F1 – input signal : reçoit un Track depuis le parent
  track = input.required<Track>();

  // F3 – output signal : notifie le parent d'un clic
  selected = output<Track>();

  // Utilitaires d'affichage
  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  formatRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  onSelect(): void {
    this.selected.emit(this.track());
  }
}
