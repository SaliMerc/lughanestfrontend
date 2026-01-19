import create from 'zustand';
import axios from 'axios';

// --- Utilities ---
function parseJwtExpMs(token) {
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

function msUntilRefresh(expMs, bufferMs = 60000) {
  const now = Date.now();
  return Math.max(0, expMs - now - bufferMs);
}

// --- Zustand Auth Store ---
const useAuthStore = create((set, get) => ({
  accessTokenValue: null,
  refreshTokenValue: null,
  isLoading: false,
  isAuthenticated: false,
  // Returns the memory-only access token
  getAccessToken: () => get().accessTokenValue,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const base = axios.create({ baseURL: import.meta.env.VITE_DEVELOPMENT_API_URL });
      const res = await base.post('/auth/login', { username, password });
      const data = res?.data || {};
      const accessToken = data.accessToken || null;
      const refreshToken = data.refreshToken || null;
      set({ accessTokenValue: accessToken, refreshTokenValue: refreshToken, isAuthenticated: !!accessToken });
      if (accessToken) scheduleRefresh(accessToken);
    } catch (err) {
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    const internal = get().__internal;
    if (internal?.refreshTimeoutId) {
      clearTimeout(internal.refreshTimeoutId);
      internal.refreshTimeoutId = null;
    }
    set({ accessTokenValue: null, refreshTokenValue: null, isAuthenticated: false });
  },

  refreshToken: async () => {
    const storeAny = get();
    if (!storeAny.__internal) storeAny.__internal = { refreshTimeoutId: null, refreshPromise: null };
    if (storeAny.__internal.refreshPromise) return storeAny.__internal.refreshPromise;

    const promise = (async () => {
      set({ isLoading: true });
      try {
        const currentRefresh = get().refreshTokenValue;
        if (!currentRefresh) {
          get().logout();
          return false;
        }
        const base = axios.create({ baseURL: import.meta.env.VITE_DEVELOPMENT_API_URL });
        const res = await base.post('/auth/refresh', { refreshToken: currentRefresh });
        const data = res?.data || {};
        const newAccess = data.accessToken || null;
        const newRefresh = data.refreshToken || null;
        if (!newAccess) {
          get().logout();
          return false;
        }
        set({ accessTokenValue: newAccess, refreshTokenValue: newRefresh || null, isAuthenticated: true });
        scheduleRefresh(newAccess);
        return true;
      } catch (e) {
        get().logout();
        return false;
      } finally {
        set({ isLoading: false });
        const internalRef = get().__internal;
        if (internalRef) internalRef.refreshPromise = null;
      }
    })();

    storeAny.__internal.refreshPromise = promise;
    return promise;
  }
}));

// Helper to schedule refresh based on token expiry
function scheduleRefresh(accessToken) {
  const storeAny = useAuthStore.getState();
  if (!storeAny.__internal) storeAny.__internal = { refreshTimeoutId: null, refreshPromise: null };
  if (storeAny.__internal.refreshTimeoutId) {
    clearTimeout(storeAny.__internal.refreshTimeoutId);
    storeAny.__internal.refreshTimeoutId = null;
  }
  const expMs = parseJwtExpMs(accessToken);
  if (!expMs) {
    storeAny.__internal.refreshTimeoutId = setTimeout(() => {
      useAuthStore.getState().refreshToken();
    }, 9 * 60 * 1000);
    return;
  }
  const delay = msUntilRefresh(expMs, 60000);
  if (delay <= 0) {
    useAuthStore.getState().refreshToken();
    return;
  }
  storeAny.__internal.refreshTimeoutId = setTimeout(() => {
    useAuthStore.getState().refreshToken();
  }, delay);
}

export default useAuthStore;
