import React, { useState } from 'react';
import { loginWithPassword } from '../api/keycloak';
import { useSessionStore } from '../store/session';
import { defaultBranding } from '../config/branding';

interface Props {
  onLoginSuccess: () => void;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setSession = useSessionStore(s => s.setSession);

  const isEmailValid = emailPattern.test(email);
  const isPasswordValid = password.length >= 8;
  const canSubmit = isEmailValid && isPasswordValid && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const tokens = await loginWithPassword(email, password);
      setSession(tokens.access_token, tokens.refresh_token, tokens.expires_in);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: defaultBranding.backgroundColor }}
    >
      <div className="flex flex-col items-center mb-8">
        <img
          src={defaultBranding.logoSrc}
          alt={`${defaultBranding.appName} logo`}
          className="mb-4 mx-auto drop-shadow-2xl rounded"
          style={{ maxWidth: '180px', height: 'auto', boxShadow: '0 6px 32px #0007' }}
        />

        <p className="text-2xl font-bold text-center mb-4" style={{ color: defaultBranding.colorPalette[0], fontFamily: defaultBranding.headlineFont }}>
          {defaultBranding.description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md p-6"
        aria-label="Sign in form"
        style={{ borderColor: defaultBranding.accentColor, borderWidth: 2 }}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-bold text-xl" style={{ color: defaultBranding.colorPalette[0], letterSpacing: '0.01em' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            className="w-full px-4 py-3 border-2 rounded focus:outline-none focus:ring-2 text-xl font-bold"
            style={{ borderColor: defaultBranding.colorPalette[2], background: defaultBranding.colorPalette[0], color: defaultBranding.colorPalette[2] }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-bold text-xl" style={{ color: defaultBranding.colorPalette[0], letterSpacing: '0.01em' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full px-4 py-3 border-2 rounded focus:outline-none focus:ring-2 text-xl font-bold"
            style={{ borderColor: defaultBranding.colorPalette[2], background: defaultBranding.colorPalette[0], color: defaultBranding.colorPalette[2] }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        {error && (
          <div className="mb-4" aria-live="assertive" role="alert">
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 px-4 font-extrabold text-xl rounded disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center" style={{ fontFamily: defaultBranding.headlineFont }}
          style={{ background: defaultBranding.colorPalette[2], color: defaultBranding.colorPalette[0], letterSpacing: '0.03em', WebkitTextFillColor: defaultBranding.colorPalette[0] }}
          disabled={!canSubmit}
          aria-busy={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2" style={{ color: defaultBranding.colorPalette[2] }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : null}
          <span style={{ color: defaultBranding.colorPalette[0], WebkitTextFillColor: defaultBranding.colorPalette[0], fontWeight: 700 }}>{loading ? 'Signing in…' : 'Sign In'}</span>
        </button>
        <div className="mt-6 text-center">
          <a
            href="http://luminth-keycloak-keycloak.apps-crc.testing/realms/luminth/protocol/openid-connect/registrations?client_id=luminth-studio&response_type=code&scope=openid&redirect_uri=http://localhost:3000/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-base font-semibold underline transition-colors duration-150" style={{ color: defaultBranding.colorPalette[0], fontFamily: defaultBranding.headlineFont }}
            aria-label="Register a new account via Keycloak"
          >
            Don&apos;t have an account? Register
          </a>
          <div className="mt-2">
            <a
              href="http://luminth-keycloak-keycloak.apps-crc.testing/realms/luminth/login-actions/reset-credentials?client_id=luminth-studio&redirect_uri=http://localhost:3000/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold underline transition-colors duration-150"
              style={{ color: defaultBranding.colorPalette[0], fontFamily: defaultBranding.headlineFont }}
              aria-label="Forgot your password? Reset it via Keycloak"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </form>
    </main>
  );
}
