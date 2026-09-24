import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export interface TokenStorage {
  setTokens(accessToken: string, refreshToken: string): Promise<void> | void;
  clearTokens(): Promise<void> | void;
  getTokens(): { accessToken: string | null; refreshToken: string | null } | Promise<{ accessToken: string | null; refreshToken: string | null }>;
}

let globalStorageAdapter: TokenStorage | null = null;

/**
 * Inject a platform-specific storage adapter (e.g. localStorage, SecureStore).
 * Call this once during app bootstrap before any auth operations.
 */
export const setAuthStorageAdapter = (adapter: TokenStorage) => {
  globalStorageAdapter = adapter;
};

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  jti: string | null;
  isHydrated: boolean;
  setTokens: (accessToken: string, refreshToken: string, expiresAt?: string) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
  /** Returns true if the access token exists but has passed its expiry timestamp */
  isExpired: () => boolean;
  hydrate: () => Promise<void>;
}

/**
 * Core auth token store. Pure Zustand — no React imports.
 * Access from non-React code via authStore.getState().
 * Access from React components via the useAuthStore hook in presentation/hooks/.
 */
export const authStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  jti: null,
  isHydrated: false,

  setTokens: (accessToken: string, refreshToken: string, expiresAt?: string) => {
    try {
      const decoded = jwtDecode<{ jti?: string }>(accessToken);
      set({ accessToken, refreshToken, expiresAt: expiresAt ?? null, jti: decoded.jti ?? null });
    } catch {
      set({ accessToken, refreshToken, expiresAt: expiresAt ?? null, jti: null });
    }
    globalStorageAdapter?.setTokens(accessToken, refreshToken);
  },

  clear: () => {
    set({ accessToken: null, refreshToken: null, expiresAt: null, jti: null });
    globalStorageAdapter?.clearTokens();
  },

  isAuthenticated: () => !!get().accessToken,

  isExpired: () => {
    const { accessToken, expiresAt } = get();
    if (!accessToken) return false;
    if (!expiresAt) return false;
    return Date.now() >= new Date(expiresAt).getTime();
  },

  hydrate: async () => {
    if (globalStorageAdapter) {
      const tokens = await globalStorageAdapter.getTokens();
      if (tokens.accessToken) {
        try {
          const decoded = jwtDecode<{ jti?: string }>(tokens.accessToken);
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            jti: decoded.jti ?? null,
            isHydrated: true,
          });
          return;
        } catch {
          set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, isHydrated: true });
          return;
        }
      }
    }
    set({ isHydrated: true });
  },
}));

