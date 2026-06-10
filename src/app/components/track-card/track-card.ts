import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HighlightFavoriteDirective } from '../../directives/highlight-favorite.directive';
import { Track } from '../../models/track.model';
import { DurationFormatPipe } from '../../pipes/duration-format.pipe';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe, HighlightFavoriteDirective, RouterLink],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
