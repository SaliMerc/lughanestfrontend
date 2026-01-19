import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

/**
 * useAuth hook
 * - Triggers a silent refresh on mount if a refresh token exists
 * - Exposes the store's state and actions for components
 * - Cleans up (clears timers) on unmount
 */
export function useAuth() {
  const isAuthenticated = useAuthStore((s: any) => s.isAuthenticated);
  const isLoading = useAuthStore((s: any) => s.isLoading);
  const login = useAuthStore((s: any) => s.login);
  const logout = useAuthStore((s: any) => s.logout);
  const refresh = useAuthStore((s: any) => s.refreshToken);
  const getAccessToken = useAuthStore((s: any) => s.getAccessToken);

  useEffect(() => {
    let mounted = true;
    // perform a silent refresh on mount if possible
    (async () => {
      // If a refresh token exists in memory, attempt rotation silently
      const internal = (useAuthStore.getState() as any).__internal;
      const hasRefresh = (useAuthStore.getState() as any).refreshTokenValue;
      if (hasRefresh) {
        // We don't await to avoid blocking mount, but we do call it
        await refresh();
      }
    })();

    return () => {
      mounted = false;
      // clear any scheduled refresh timer
      const internal = (useAuthStore.getState() as any).__internal;
      if (internal?.refreshTimeoutId) {
        clearTimeout(internal.refreshTimeoutId);
        internal.refreshTimeoutId = null;
      }
    };
    // intentionally run only on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken: refresh,
    getAccessToken,
  } as const;
}

export default useAuth;
