import { WS_BASE_URL } from '@/constants';
import { authRepository, authStore, sessionRevokedHandler } from '@/features/authentication';
import { buildAuthenticatedWsUrl, createApiClient, createEventRouter, getGlobalApiClient, requestWsTicket, setGlobalApiClient, wsConnection } from '@/shared/api';


/**
 * Initializes the API client with auth token injection and automatic
 * token refresh on 401. Must be called once before any API requests.
 */
export function setupApiClient(): void
{
  const client = createApiClient({
    getToken: () => authStore.getState().accessToken,
    onTokenRefresh: async () =>
    {
      const { refreshToken } = authStore.getState();
      if (!refreshToken) throw new Error('No refresh token available');
      const tokens = await authRepository.refreshToken({
        refreshToken: refreshToken
      });
      authStore.getState().setTokens(
        tokens.accessToken,
        tokens.refreshToken,
        tokens.accessExpiresAt,
      );
      return tokens.accessToken;
    },
  });
  setGlobalApiClient(client);
}

/**
 * Registers all WebSocket event handlers and wires them to the event bus.
 * Returns an array of unsubscribe functions for cleanup.
 */
export function registerWsHandlers(): Array<() => void>
{
  return [
    sessionRevokedHandler.register(),
    // Add new feature handlers here as the app grows:
    // balanceUpdatedHandler.register(),
  ];
}

/**
 * Connects the WebSocket once the user is authenticated.
 * Fetches a ticket from the API and builds the authenticated URL.
 */
export async function connectWebSocket(): Promise<void>
{
  const ticket = await requestWsTicket(getGlobalApiClient());
  const url = buildAuthenticatedWsUrl(WS_BASE_URL, ticket);

  const router = createEventRouter();
  wsConnection.onMessage = router;
  wsConnection.connect(url);
}

/**
 * Main bootstrap function. Call this once at app startup.
 */
export async function bootstrap(): Promise<void>
{
  // 1. Set up the HTTP client
  setupApiClient();

  // 2. Register WS handlers (they'll start listening on the event bus)
  registerWsHandlers();

  // 3. Rehydrate auth state from persisted storage
  await authStore.getState().hydrate();
}

