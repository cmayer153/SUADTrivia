import { useAuth } from '@clerk/clerk-react';
import { SERVER_BASE } from './urls';

/**
 * fetch() wrapper that attaches the current Clerk session token.
 * Call getToken() per request -- session tokens expire after 60s and Clerk
 * refreshes them for us. Content-Type is left to the caller so FormData
 * uploads keep their multipart boundary.
 */
export function useApi() {
  const { getToken } = useAuth();

  // headers is narrowed to a plain object: the spread below would silently
  // drop entries from a Headers instance.
  return async function apiFetch(
    path: string,
    init: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> } = {},
  ) {
    const token = await getToken();

    return fetch(SERVER_BASE + path, {
      ...init,
      headers: {
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };
}
