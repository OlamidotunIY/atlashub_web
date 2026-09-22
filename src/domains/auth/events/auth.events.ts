import type { BasePayload } from "@/shared/api";


/**
 * Payload received when a session is force-revoked by the backend.
 * The aggregateId (from BasePayload) is the userId whose session was revoked.
 * Backend event: auth.session.revoked
 */
export interface SessionRevokedPayload extends BasePayload {
  reason?: string;
}

/**
 * Payload received when a new session is created.
 * The aggregateId (from BasePayload) is the userId.
 * Backend event: auth.session.created
 * Note: Not used to drive the login flow — the HTTP response handles that.
 *       Reserved for a future "Active Sessions" feature.
 */
export interface SessionCreatedPayload extends BasePayload {
  ipAddress?: string;
  userAgent?: string;
}

