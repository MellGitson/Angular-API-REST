import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Track } from '../models/track.model';

export interface TrackWritePayload {
  title: string;
  artist: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tracks`;

  getTrack(id: number): Observable<Track> {
    return this.http
      .get<unknown>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => this.normalizeTrack(response)));
  }

  getTracks(): Observable<Track[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => this.extractTrackList(response).map((item) => this.normalizeTrack(item))),
    );
  }

  createTrack(payload: TrackWritePayload): Observable<Track> {
    return this.http
      .post<unknown>(this.apiUrl, payload)
      .pipe(map((response) => this.normalizeTrack(response)));
  }

  updateTrack(id: number, payload: TrackWritePayload): Observable<Track> {
    return this.http
      .put<unknown>(`${this.apiUrl}/${id}`, payload)
      .pipe(map((response) => this.normalizeTrack(response)));
  }

  search(query: string): Observable<Track[]> {
    const q = query.trim();
    if (!q) return this.getTracks();
    return this.http
      .get<unknown>(this.apiUrl, { params: { q } })
      .pipe(
        map((response) => this.extractTrackList(response).map((item) => this.normalizeTrack(item))),
      );
  }

  private extractTrackList(response: unknown): unknown[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (this.isObject(response)) {
      const tracks = response['tracks'];
      if (Array.isArray(tracks)) {
        return tracks;
      }

      const data = response['data'];
      if (Array.isArray(data)) {
        return data;
      }
    }

    return [];
  }

  private normalizeTrack(raw: unknown): Track {
    const source = this.isObject(raw) ? raw : {};

    const title = this.asString(source['title']) || 'Titre inconnu';
    const artist = this.asString(source['artist']) || 'Artiste inconnu';

    return {
      id: this.asNumber(source['id'], Date.now()),
      title,
      artist,
      album: this.asString(source['album']) || 'Single',
      genre: this.asString(source['genre']) || 'Pop',
      duration: this.asNumber(source['durationSeconds'], this.asNumber(source['duration'])),
      rating: this.asNumber(source['rating'], 0),
      favorite: this.asBoolean(source['favorite']),
      coverUrl:
        this.asString(source['coverUrl']) ||
        `https://picsum.photos/seed/${encodeURIComponent(`${title}-${artist}`)}/200/160`,
      year: typeof source['year'] === 'number' ? source['year'] : null,
    };
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private asNumber(value: unknown, fallback = 0): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  }

  private asBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      return value !== 0;
    }

    return false;
  }
}
