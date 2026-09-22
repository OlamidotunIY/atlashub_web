export enum WsEventType {
  // Auth / Sessions
  SESSION_CREATED            = 'auth.session.created',
  SESSION_REVOKED            = 'auth.session.revoked',

  // Transactions
  TRANSACTION_INITIATED      = 'transaction.initiated',
  TRANSACTION_COMPLETED      = 'transaction.completed',
  TRANSACTION_FAILED         = 'transaction.failed',

  // Transfers
  TRANSFER_INITIATED         = 'transfer.initiated',
  TRANSFER_COMPLETED         = 'transfer.completed',
  TRANSFER_FAILED            = 'transfer.failed',

  // Ledger / Balance
  BALANCE_UPDATED            = 'ledger.balance.updated',

  // Billing / Subscriptions
  SUBSCRIPTION_ACTIVATED     = 'billing.subscription.activated',
  SUBSCRIPTION_CANCELED      = 'billing.subscription.canceled',
  SUBSCRIPTION_PAST_DUE      = 'billing.subscription.past_due',

  // Accounts
  VIRTUAL_ACCOUNT_ISSUED     = 'accounts.virtual_account.issued',

  // Identity / Compliance
  COMPLIANCE_STATUS_CHANGED  = 'identity.compliance.status_changed',
  ORG_PROFILE_UPDATED        = 'identity.organization.updated',

  // Notifications
  NOTIFICATION_RECEIVED      = 'notification.received',

  // System
  PING                       = 'system.ping',
}

export type WsMessage<T> = { type: WsEventType; payload: T; timestamp: string };