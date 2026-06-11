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
  track = input.required<Track>();
  isPlaying = input<boolean>(false);
  selected = output<Track>();
  toggleFavorite = output<Track>();

  onSelect(): void {
    this.selected.emit(this.track());
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.toggleFavorite.emit(this.track());
  }
}
