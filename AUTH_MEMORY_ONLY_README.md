# Memory-Only Auth System (Zustand + Axios, JS)

## Security & Usage Notes
- **Tokens are stored only in memory** (Zustand store). No localStorage, sessionStorage, cookies, or IndexedDB.
- **User is logged out on page refresh or tab close** (tokens are lost by design).
- **Short-lived access tokens**: JWT expiry is parsed and silent refresh is scheduled 60s before expiry.
- **Refresh token rotation**: Each refresh replaces both tokens (backend must support this).
- **Automatic silent refresh**: Scheduled with setTimeout, cleared on logout/unmount.
- **Single refresh lock**: Only one refresh runs at a time, even if multiple requests trigger it.
- **401 handling**: Axios instance attempts a single refresh on 401, retries once, then logs out if refresh fails.
- **No tokens are ever logged to the console.**

## Files
- `src/stores/authStore.js` — Zustand store for memory-only tokens and auth actions
- `src/api/axiosPrivate.js` — Axios instance with interceptors for auth and refresh
- `src/hooks/useAuth.js` — React hook for auth state/actions and silent refresh

## Example Usage

**Login Form:**
```jsx
import useAuth from '../hooks/useAuth';

function LoginForm() {
  const { login, logout, isAuthenticated, isLoading } = useAuth();
  // ...
}
```

**Authenticated API Call:**
```js
import { getAxiosPrivate } from '../api/axiosPrivate';
const api = getAxiosPrivate();

async function getProtected() {
  const res = await api.get('/protected/resource');
  return res.data;
}
```

## Requirements
- Backend must provide `/auth/login` and `/auth/refresh` endpoints that return `{ accessToken, refreshToken }`.
- Install dependencies:
```sh
npm install zustand axios
```

## Limitations
- **Sessions do not persist across reloads.** This is by design for maximum security (no persistent storage).
- If you want persistent sessions, use httpOnly cookies (not included here).
