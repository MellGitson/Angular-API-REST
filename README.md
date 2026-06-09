# Cinetrack

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Frontend + Backend (2 projets separes)

Le frontend Angular et l'API music-api doivent tourner dans deux dossiers differents:

- Projet 1: ce repo Angular (port 4200)
- Projet 2: repo backend music-api (port 3000)

### 1) Cloner et lancer le backend

Dans un dossier parent (hors de ce repo):

- `git clone <URL_GIT_MUSIC_API>`
- `cd music-api`
- `npm install`
- `npm start`

API attendue sur `http://localhost:3000`.

Verification rapide:

- Ouvrir `http://localhost:3000/tracks` (lecture publique)
- Tester `POST /login` avec `demo@ipssi.fr` / `password123` pour obtenir un token JWT

Notes backend:

- Base SQLite auto-creee (`data.db`)
- Seed applique au demarrage (morceaux/utilisateur demo)
- CORS est active cote API pour autoriser le frontend local

### 2) Lancer le frontend Angular

Dans ce repo:

- `npm install`
- `npm start` (ou `ng serve`)

La configuration API est dans `src/environments/environment.ts`:

- `apiUrl: 'http://localhost:3000'`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
