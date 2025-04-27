import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  setSession: (accessToken: string, refreshToken: string, expiresIn: number) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  setSession: (accessToken, refreshToken, expiresIn) => {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
    sessionStorage.setItem('expires_in', expiresIn.toString());
    set({ accessToken, refreshToken, expiresIn });
  },
  clearSession: () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('expires_in');
    set({ accessToken: null, refreshToken: null, expiresIn: null });
  },
}));

// Hydrate Zustand session from sessionStorage on app load
export function hydrateSession() {
  const accessToken = sessionStorage.getItem('access_token');
  const refreshToken = sessionStorage.getItem('refresh_token');
  const expiresInRaw = sessionStorage.getItem('expires_in');
  const expiresIn = expiresInRaw ? parseInt(expiresInRaw, 10) : null;
  if (accessToken && refreshToken && expiresIn) {
    useSessionStore.getState().setSession(accessToken, refreshToken, expiresIn);
  }
}
