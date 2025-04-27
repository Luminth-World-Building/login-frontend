# Keycloak Setup Guide for login-frontend

This guide will help you configure Keycloak to work seamlessly with the login-frontend micro-frontend.

---

## 1. Create a Realm
- **Name:** luminth (or your preferred realm)

## 2. Create a Client
- **Client ID:** luminth-studio
- **Client Type:** OpenID Connect
- **Access Type:** public (for SPA; confidential for server-side)
- **Valid Redirect URIs:** http://localhost:3000/*, http://your-domain/*
- **Web Origins:** http://localhost:3000, http://your-domain
- **Direct Access Grants Enabled:** ON
- **Standard Flow Enabled:** ON
- **Implicit Flow Enabled:** OFF
- **Service Accounts Enabled:** OFF
- **Authorization Enabled:** OFF

## 3. Configure CORS
- **Web Origins** must match your frontend's URL (localhost and production).
- Enable CORS in Keycloak admin if necessary.

## 4. User Setup
- Create users in the realm with a valid email and password.
- Ensure users have the `email` verified or set as required if needed.

## 5. Token Settings
- **Access Token Lifespan:** 300 seconds (default, can adjust)
- **Refresh Token Lifespan:** 1800 seconds (default, can adjust)

## 6. Important Keycloak Settings Summary
| Setting                        | Value/Recommendation                |
|------------------------------- |-------------------------------------|
| Realm Name                     | luminth (or your app)               |
| Client ID                      | luminth-studio                      |
| Access Type                    | public                              |
| Direct Access Grants           | ON                                  |
| Standard Flow                  | ON                                  |
| Valid Redirect URIs            | http://localhost:3000/*             |
| Web Origins                    | http://localhost:3000               |
| Access Token Lifespan          | 300                                 |
| Refresh Token Lifespan         | 1800                                |

---

## SMTP Email Setup for Registration/Verification

To enable registration and email verification, you must configure SMTP in Keycloak so it can send emails (verification, password reset, etc.).

### 1. Configure SMTP in Keycloak
1. Log in to the Keycloak Admin Console.
2. Go to your **Realm** → **Realm Settings** → **Email** tab.
3. Enter your SMTP server details:
   - **Host:** smtp.office365.com (for Office365; use your provider's address)
   - **Port:** 587
   - **From:** info@luminth.ai (must be a valid address for your domain)
   - **Reply-To:** noreply@luminth.ai (optional, but recommended)
   - **From Display Name:** General Orchestration Daemon (or your app/team name)
   - **Encryption:** StartTLS
   - **Username:** your email address (e.g., peter@luminth.ai)
   - **Password:** your SMTP password or app password
   - **Authentication Enabled:** true
   - **SSL/TLS:** false (only StartTLS checked)
4. Click **Test Connection** to verify.
5. Click **Save**.

### 2. Allowing SMTP from Your Domain
- Make sure your SMTP provider (e.g., Office365, Gmail, etc.) allows SMTP relay from the Keycloak server's IP.
- The **From** and **Reply-To** addresses should be authorized to send mail for your domain (check SPF/DKIM records).
- If using a cloud provider, ensure firewall rules allow outbound SMTP (port 587).

### 3. Troubleshooting SMTP Issues
- If you see errors like "Failed to send email," double-check your SMTP settings and credentials.
- Some providers (like Gmail, Office365) may require app passwords or special permissions for SMTP relay.
- Use the **Test Connection** button in Keycloak to debug.
- Check your SMTP provider's logs for blocked or failed messages.

---

## Password Reset Setup

To enable users to reset their password using the "Forgot Password?" feature, configure the following in Keycloak:

### 1. Configure SMTP/Email
- Keycloak must be able to send emails. Complete the SMTP setup in **Realm Settings > Email** (see above).

### 2. Enable Forgot Password
- Go to **Realm Settings > Login**.
- Ensure **Forgot Password** is set to **ON**.

### 3. User Email Requirements
- Each user must have a valid, unique email address in their profile.

### 4. Client Redirect URIs
- Make sure your client’s **Valid Redirect URIs** and **Web Origins** include your frontend’s URLs.

### 5. (Optional) Email Verification
- To require email verification before allowing password reset, enable **Verify Email** in **Realm Settings > Login**.

#### Troubleshooting
- If reset emails are not received, check SMTP settings and spam folders.
- If reset links fail, confirm the redirect URI is allowed in client settings.

#### Password Reset Settings Summary

| Setting             | Value/Recommendation             |
|---------------------|----------------------------------|
| SMTP/Email          | Configured and tested            |
| Forgot Password     | ON (Realm Settings > Login)      |
| User Email          | Must be valid and unique         |
| Valid Redirect URIs | Include your frontend URLs       |

---

## Troubleshooting
- **CORS Issues:** Ensure Web Origins and Valid Redirect URIs are set correctly.
- **Invalid Credentials:** Confirm user exists and password is correct.
- **Token Expiry:** Adjust token lifespans as needed in Keycloak.

---

For more advanced Keycloak config (PKCE, social login, MFA), see the Keycloak documentation: https://www.keycloak.org/docs/latest/server_admin/
