import { WsEventHandler, WsEventType } from "@/shared/api"
import { authStore } from "../state/auth.store.js"
import { toast } from "@/shared/hooks"
import type { SessionRevokedPayload } from "@/domains/auth"

/**
 * Listens for SESSION_REVOKED events from the backend WebSocket.
 * Fired when an admin suspends a user or their session is force-invalidated.
 * Clears the local token store, which triggers the auth guard to redirect to login.
 */
export class SessionRevokedHandler extends WsEventHandler<SessionRevokedPayload> {
  readonly eventType = WsEventType.SESSION_REVOKED

  handle(_payload: SessionRevokedPayload): void {
    authStore.getState().clear()

    toast.add({
      title: "Session Revoked",
      description: `Your session has been revoked, Reason: ${_payload.reason}. Please log in again.`,
      type: "error",
    })
  }
}

export const sessionRevokedHandler = new SessionRevokedHandler()
