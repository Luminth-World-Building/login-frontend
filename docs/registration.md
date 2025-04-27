# User Registration with Keycloak (Built-in)

This project supports user registration using Keycloak’s built-in registration page for maximum security and simplicity.

---

## How It Works
- On the login page, click the **Register** link below the Sign In button.
- You will be redirected to the Keycloak registration page for this app.
- Fill out the form and submit. Keycloak will handle validation, password policy, and email verification (if enabled).
- After registration, you can log in with your new credentials.

---

## Enabling Registration in Keycloak
1. In the Keycloak Admin Console, go to your Realm.
2. Go to **Authentication > Registration**.
3. Set **User registration** to `ON`.
4. (Optional) Enable **Email as username** and **Verify email** for best security.

---

## Customizing the Registration Page
- See [Keycloak Theme Documentation](https://www.keycloak.org/docs/latest/server_development/#_themes) for how to style the registration page to match your brand.

---

## Troubleshooting
- If registration is not available, ensure it is enabled in the realm settings.
- For CORS or redirect issues, see [keycloak-setup.md](./keycloak-setup.md).
