import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { TrackService } from './services/track';
import { AuthService } from './services/auth';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: TrackService,
          useValue: {
            getTracks: () => of([]),
            createTrack: () => of(null),
            updateTrack: () => of(null),
          },
        },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            login: () => of('token'),
            logout: () => undefined,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('CinéTrack');
  });
});
