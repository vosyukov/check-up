import { CustomDecorator, Injectable, OnApplicationBootstrap, SetMetadata } from '@nestjs/common';
import { METADATA_KEY } from '../constants';
import { ConnectionManagerService } from './connection-manager.service';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { EventName, EventPayload } from '../events-interfaces';

export const EventBusSubscriber = (options: { eventName: EventName }): CustomDecorator => {
  return SetMetadata(METADATA_KEY, options);
};

@Injectable()
export class EventConsumerService implements OnApplicationBootstrap {
  handlers = new Map<EventName, never>();

  constructor(private readonly connectionManagerService: ConnectionManagerService, private readonly discoveryService: DiscoveryService, private readonly metadataScanner: MetadataScanner, private readonly reflector: Reflector) {}

  async onApplicationBootstrap() {
    this.explore();
    console.log('fff');
    this.f(); //
  }

  public explore(): void {
    const providers = this.discoveryService.getProviders();
    const controllers = this.discoveryService.getControllers();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const searchInstances = [...providers, ...controllers].filter((wrapper) => wrapper.instance);

    searchInstances.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      const prototype = Object.getPrototypeOf(instance);

      const allMethodNames = this.metadataScanner.getAllMethodNames(prototype);

      allMethodNames.map((methodKey) => {
        const metadata = this.reflector.get(METADATA_KEY, instance[methodKey]);

        if (metadata) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.handlers.set(metadata.event, instance[methodKey]);
        }
      });
    });
  }

  async f() {
    await this.connectionManagerService.consumer(async ({ eventName, payload }) => {
      const handler = this.handlers.get(eventName);

      if (handler) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await handler(payload);
      }
    });
  }

  @EventBusSubscriber({ eventName: 'ADD_USER' })
  public test2(payload: EventPayload['ADD_USER']) {
    console.log('test2');
    console.log(payload.userId);
    // throw 'errrrrro'
  }
}
