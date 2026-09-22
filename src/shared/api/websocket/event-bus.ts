import { WsEventType } from "./event-types.js";

export interface BasePayload {
    eventId: string;
    aggregateId: string;
    occurredAt: string;
}

export type EventHandler<T> = (event: T) => void;

export class EventBus<T extends BasePayload = BasePayload> {
    private listeners: Map<WsEventType, Set<EventHandler<T>>> = new Map();

    subscribe(eventType: WsEventType, handler: EventHandler<T>): () => void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType)!.add(handler);

        return () => {
            this.listeners.get(eventType)?.delete(handler);
        };
    }

    publish(eventType: WsEventType, payload: T): void {
        const handlers = this.listeners.get(eventType);
        if (handlers) {
            for (const handler of handlers) {
                try {
                    handler(payload);
                } catch (err) {
                    console.error(`[EventBus] Error in handler for ${eventType}:`, err);
                }
            }
        }
    }

    clear(): void {
        this.listeners.clear();
    }
}

export const eventBus = new EventBus<BasePayload>();