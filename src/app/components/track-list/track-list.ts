import { Component, input, output } from '@angular/core';
import { Track } from '../../models/track.model';
import { TrackCardComponent } from '../track-card/track-card';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './track-list.html',
  styleUrl: './track-list.scss',
})
export class TrackListComponent {
  // F2 – input signal : reçoit le tableau de morceaux
  tracks = input<Track[]>([]);

  // F3 – output signal : remonte le morceau cliqué vers le parent
  trackSelected = output<Track>();
}
