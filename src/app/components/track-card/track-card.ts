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

  // F3 – indique si ce morceau est actuellement sélectionné
  isPlaying = input<boolean>(false);

  // F3 – output signal : notifie le parent d'un clic
  selected = output<Track>();

  onSelect(): void {
    this.selected.emit(this.track());
  }
}
