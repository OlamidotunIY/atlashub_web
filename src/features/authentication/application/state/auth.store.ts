import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  jti: string | null;
  isHydrated: boolean;
  markHydrated: () => void;
  setTokens: (accessToken: string, refreshToken: string, expiresAt?: number) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
  isExpired: () => boolean;
}

/** Browser authentication state persisted by Zustand's localStorage middleware. */
export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      jti: null,
      isHydrated: false,

      markHydrated: () => set({ isHydrated: true }),

      setTokens: (accessToken, refreshToken, expiresAt) => {
        const jti = readTokenId(accessToken);
        set({ accessToken, refreshToken, expiresAt: expiresAt ?? null, jti });
      },

      clear: () => set({ accessToken: null, refreshToken: null, expiresAt: null, jti: null }),

      isAuthenticated: () => Boolean(get().accessToken),

      isExpired: () => {
        const { accessToken, expiresAt } = get();
        return Boolean(accessToken && expiresAt && Date.now() >= expiresAt * 1000);
      },
    }),
    {
      name: 'atlashub-auth-session',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        jti: state.jti,
      }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

function readTokenId(accessToken: string): string | null {
  try {
    return jwtDecode<{ jti?: string }>(accessToken).jti ?? null;
  } catch {
    return null;
  }
}
