
import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

// useAuth hook for Zustand memory-only auth
function useAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const refresh = useAuthStore((s) => s.refreshToken);
  const getAccessToken = useAuthStore((s) => s.getAccessToken);

  useEffect(() => {
    // Silent refresh on mount if refresh token exists in memory
    const hasRefresh = useAuthStore.getState().refreshTokenValue;
    if (hasRefresh) {
      refresh();
    }
    return () => {
      // Clean up scheduled refresh timer
      const internal = useAuthStore.getState().__internal;
      if (internal && internal.refreshTimeoutId) {
        clearTimeout(internal.refreshTimeoutId);
        internal.refreshTimeoutId = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken: refresh,
    getAccessToken,
  };
}

export default useAuth;
