import { useEffect } from 'react';
import { useSessionStore } from '../store/session';
import { refreshAccessToken } from '../api/refreshToken';

// Refresh the token 10s before expiry (for testing)
const REFRESH_BUFFER = 10; // seconds

export function useTokenRefresh() {
  const { refreshToken, expiresIn, setSession, clearSession } = useSessionStore();

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    // Calculate ms until refresh
    const refreshInMs = Math.max((expiresIn - REFRESH_BUFFER), 10) * 1000;
    const timeout = setTimeout(async () => {
      try {
        console.log('[TokenRefresh] Attempting token refresh...');
        const res = await refreshAccessToken(refreshToken);
        setSession(res.access_token, res.refresh_token, res.expires_in);
        console.log('[TokenRefresh] Token refreshed! New expiresIn:', res.expires_in);
      } catch (err) {
        console.error('[TokenRefresh] Refresh failed:', err);
        clearSession();
        window.location.replace('/login');
      }
    }, refreshInMs);

    return () => clearTimeout(timeout);
  }, [refreshToken, expiresIn, setSession, clearSession]);
}
