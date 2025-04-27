# Luminth Login Frontend

A modern, brandable Keycloak login micro-frontend for the Luminth platform (and beyond).

---

## Features
- Keycloak authentication (login, refresh, logout)
- Session persistence & auto-hydration
- Fully brandable (logo, colors, fonts, app name)
- Responsive, accessible, and modern UI
- Easy integration into any SPA or micro-frontend system

---

## Quick Start

1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

2. **Run locally:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The app will be live at http://localhost:3000

3. **Configure Keycloak:**
   See [docs/keycloak-setup.md](./docs/keycloak-setup.md) for a complete Keycloak setup guide.

4. **Branding & Theming:**
   - Edit `src/config/branding.ts` to set your logo, colors, fonts, and app name.
   - Place your logo in `src/images/`.
   - All UI colors/fonts update automatically.

5. **Usage:**
   - Users log in with email and password.
   - On success, users are redirected to `/app`.
   - Session is persisted and auto-refreshed.
   - Logout is available on the `/app` page.

---

## Documentation
- [User & Setup Guide](./docs/user-guide.md)
- [Keycloak Setup Guide](./docs/keycloak-setup.md)

---

## Accessibility & Responsiveness
- Keyboard-accessible, high contrast, WCAG 2.1 AA compliant.
- Looks great on desktop and mobile.

---

## Advanced
- See [docs/user-guide.md](./docs/user-guide.md) for advanced theming, integration, and troubleshooting.
- For PKCE, social login, or custom flows, see code comments and Keycloak docs.

---

## License
MIT (or your preferred license)

---

For questions or contributions, see [docs/user-guide.md](./docs/user-guide.md).


This is the canonical login UI for the Luminth platform, built with React 18, Vite, Tailwind CSS, Zustand, TanStack Query, and ky.

## Getting Started

```sh
npm install
npm run dev
```

## Build for Production

```sh
npm run build
```

## Docker

Build and run locally:

```sh
docker build -t luminth-login .
docker run -p 8080:8080 luminth-login
```

---

© 2025 Luminth Inc.
