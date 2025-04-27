# login-frontend User & Setup Guide

This guide will help you install, configure, and use the login-frontend micro-frontend.

---

## 1. Installation

```
yarn install
# or
npm install
```

## 2. Configuration
- Edit `src/config/branding.ts` to customize logo, colors, fonts, and app name.
- Ensure `logoSrc` points to your logo file in `src/images/`.
- Update Keycloak base URL in `src/api/keycloak.ts` and `src/api/refreshToken.ts` if needed.

## 3. Running Locally

```
yarn dev
# or
npm run dev
```

- The app will be available at http://localhost:3000

## 4. Environment Variables
- (Optional) Add support for environment variables in Vite for per-deployment config.

## 5. Usage
- Users enter their email and password.
- On successful login, users are redirected to `/app`.
- Session is persisted and auto-refreshed.
- Logout is available on the `/app` page.

## 6. Registration
- Click the **Register** link below the Sign In button to create a new account.
- This opens the Keycloak registration page for your app.
- **Note:** Registration with email verification requires SMTP to be configured in Keycloak. See the [SMTP setup guide](./keycloak-setup.md#smtp-email-setup-for-registrationverification).
- See [registration.md](./registration.md) for details and troubleshooting.

## 6. Theming & Branding
- All theming is managed via `src/config/branding.ts`.
- To rebrand, update colors, fonts, logo, and app name in one place.

## 7. Accessibility & Responsiveness
- Fully keyboard-accessible.
- High contrast, WCAG 2.1 AA compliant.
- Responsive for mobile and desktop.

## 8. Advanced
- See [keycloak-setup.md](./keycloak-setup.md) for Keycloak configuration.
- For advanced integration (PKCE, social login, etc.), see code comments and Keycloak docs.

---

## Troubleshooting
- See error messages in the UI for login problems.
- Check browser console for token/network issues.
- For CORS or Keycloak config errors, see [keycloak-setup.md](./keycloak-setup.md).
