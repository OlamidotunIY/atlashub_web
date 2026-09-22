import { WsEventType } from '../event-types.js';
import { eventBus, EventBus, type BasePayload } from '../event-bus.js';

export abstract class WsEventHandler<TPayload extends BasePayload> {
  abstract readonly eventType: WsEventType;

  register(): () => void {
    const bus = eventBus as unknown as EventBus<TPayload>;
    return bus.subscribe(this.eventType, this.handle.bind(this));
  }

  abstract handle(payload: TPayload): void;
}
