import create from 'zustand';
import axios from 'axios';
import { AxiosInstance } from 'axios';

// --- Types ---
export interface Tokens {
  accessTokenValue: string | null;
  refreshTokenValue: string | null;
}

export interface AuthState extends Tokens {
  isLoading: boolean; // initial auth / refresh check
  isAuthenticated: boolean;
  // actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  getAccessToken: () => string | null;
}

// --- Utilities ---
function parseJwtExpMs(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload || typeof payload.exp !== 'number') return null;
    return payload.exp * 1000; // convert to ms
  } catch (e) {
    return null;
  }
}

function msUntilRefresh(expMs: number, bufferMs = 60_000): number {
  const now = Date.now();
  // schedule bufferMs before expiry (but at least 0ms)
  return Math.max(0, expMs - now - bufferMs);
}

// --- Implementation ---
type RefreshPromise = Promise<boolean> | null;

const useAuthStore = create<AuthState & { __internal?: {
  refreshTimeoutId: ReturnType<typeof setTimeout> | null;
  refreshPromise: RefreshPromise;
  axiosPrivate: AxiosInstance | null;
}}>((set: any, get: any) => ({
  accessTokenValue: null,
  refreshTokenValue: null,
  isLoading: false,
  isAuthenticated: false,
  // getAccessToken returns the memory-only token
  getAccessToken: () => get().accessTokenValue,

  login: async (username: string, password: string) => {
    set({ isLoading: true });
    try {
      // Use a short-lived request to server for login
      const base = axios.create({ baseURL: (import.meta as any).env.VITE_DEVELOPMENT_API_URL });
      const res = await base.post('/auth/login', { username, password });
      const data = res?.data ?? {};
      const accessToken = data.accessToken ?? null;
      const refreshToken = data.refreshToken ?? null;
      // Security: never console.log tokens
      set({ accessTokenValue: accessToken, refreshTokenValue: refreshToken, isAuthenticated: !!accessToken });
      // schedule a refresh if accessToken exists
      if (accessToken) scheduleRefresh(accessToken);
    } catch (err) {
      // bubble up the error for UI to show (do not leak tokens)
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    // Clear tokens and any refresh timer
    const internal = (get() as any).__internal;
    if (internal?.refreshTimeoutId) {
      clearTimeout(internal.refreshTimeoutId);
      internal.refreshTimeoutId = null;
    }
    // wipe memory-only tokens
    set({ accessTokenValue: null, refreshTokenValue: null, isAuthenticated: false });
  },

  refreshToken: async (): Promise<boolean> => {
    // prevent duplicate refresh requests
  const storeAny = get() as any;
    if (!storeAny.__internal) storeAny.__internal = { refreshTimeoutId: null, refreshPromise: null, axiosPrivate: null };
    if (storeAny.__internal.refreshPromise) return storeAny.__internal.refreshPromise;

    const promise: Promise<boolean> = (async () => {
      set({ isLoading: true });
      try {
        const currentRefresh = get().refreshTokenValue;
        if (!currentRefresh) {
          // no refresh token available -> logout
          get().logout();
          return false;
        }
        // call refresh endpoint
        const base = axios.create({ baseURL: (import.meta as any).env.VITE_DEVELOPMENT_API_URL });
        const res = await base.post('/auth/refresh', { refreshToken: currentRefresh });
        const data = res?.data ?? {};
        const newAccess = data.accessToken ?? null;
        const newRefresh = data.refreshToken ?? null;
        if (!newAccess) {
          // invalid response
          get().logout();
          return false;
        }
        set({ accessTokenValue: newAccess, refreshTokenValue: newRefresh ?? null, isAuthenticated: true });
        // schedule next refresh
        scheduleRefresh(newAccess);
        return true;
      } catch (e) {
        // refresh failed -> clear tokens
        get().logout();
        return false;
      } finally {
        set({ isLoading: false });
        const internalRef = (get() as any).__internal;
        if (internalRef) internalRef.refreshPromise = null;
      }
    })();

    storeAny.__internal.refreshPromise = promise;
    return promise;
  }
}));

// helper to schedule refresh based on token expiry
function scheduleRefresh(accessToken: string) {
  const storeAny = useAuthStore.getState() as any;
  if (!storeAny.__internal) storeAny.__internal = { refreshTimeoutId: null, refreshPromise: null, axiosPrivate: null };
  // clear existing
  if (storeAny.__internal.refreshTimeoutId) {
    clearTimeout(storeAny.__internal.refreshTimeoutId);
    storeAny.__internal.refreshTimeoutId = null;
  }
  const expMs = parseJwtExpMs(accessToken);
  if (!expMs) {
    // If we can't parse expiry, set a conservative refresh in 9 minutes
    storeAny.__internal.refreshTimeoutId = setTimeout(() => {
      void useAuthStore.getState().refreshToken();
    }, 9 * 60 * 1000);
    return;
  }
  const delay = msUntilRefresh(expMs, 60_000); // refresh 60s before expiry
  // If delay is 0 or negative, immediately try to refresh
  if (delay <= 0) {
    // run refresh but don't await here
    void useAuthStore.getState().refreshToken();
    return;
  }

  storeAny.__internal.refreshTimeoutId = setTimeout(() => {
    // call refresh when timer fires
    void useAuthStore.getState().refreshToken();
  }, delay);
}

export default useAuthStore;
