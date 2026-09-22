import { Client, IFrame, IMessage } from '@stomp/stompjs';

class WsConnection {
  private client: Client | null = null;
  private currentUrl: string | null = null;
  private isIntentionalDisconnect = false;

  public onMessage: (raw: string) => void = () => {};

  connect(url: string): void {
    this.currentUrl = url;
    this.isIntentionalDisconnect = false;
    this.initClient();
  }

  private initClient(): void {
    if (!this.currentUrl) return;

    this.cleanup();

    this.client = new Client({
      brokerURL: this.currentUrl,
      reconnectDelay: 2000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log(`[WsConnection] Connected via STOMP`);

        // Subscribe to private events as mapped in the backend
        this.client?.subscribe('/user/queue/events', (message: IMessage) => {
          if (message.body) {
            this.onMessage(message.body);
          }
        });
      },
      onStompError: (frame:IFrame) => {
        console.error('[WsConnection] STOMP error:', frame.headers['message'], frame.body);
      },
      onWebSocketClose: () => {
        if (!this.isIntentionalDisconnect) {
          console.warn('[WsConnection] WebSocket closed unexpectedly.');
        }
      }
    });

    this.client.activate();
  }

  disconnect(): void {
    this.isIntentionalDisconnect = true;
    this.currentUrl = null;
    this.cleanup();
  }

  private cleanup(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }

  send(payload: unknown, destination: string = '/app/messages'): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination,
        body: typeof payload === 'string' ? payload : JSON.stringify(payload),
      });
    } else {
      console.warn('[WsConnection] Cannot send payload, STOMP client is not connected');
    }
  }
}

export const wsConnection = new WsConnection();