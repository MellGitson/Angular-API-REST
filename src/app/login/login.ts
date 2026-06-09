import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly model = signal<LoginFormValue>({
    email: 'demo@ipssi.fr',
    password: 'password123',
  });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: "L'email est requis" });
    required(path.password, { message: 'Le mot de passe est requis' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.loginForm().valid()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.model()).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMessage.set("Connexion impossible. Vérifie tes identifiants et que l'API tourne.");
        this.loading.set(false);
      },
    });
  }
}
