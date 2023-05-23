import { Injectable } from '@nestjs/common';

import { ConnectionManagerService } from './connection-manager.service';
import { EXCHANGE_NAME, ROUTING_KEY } from '../constants';
import { EventName } from '../events-interfaces';

@Injectable()
export class EventPublisherService {
  i = 0;

  constructor(private readonly connectionManagerService: ConnectionManagerService) {
    setInterval(() => {
      this.publishEvent('ADD_USER', { userId: this.i }, {});
      this.i++;
    }, 500);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async publishEvent<T>(event: EventName, payload: T, options: {}): Promise<void> {
    const channel = this.connectionManagerService.getChannel();
    await channel.publish(EXCHANGE_NAME, ROUTING_KEY, { event, payload: payload });
  }
}
