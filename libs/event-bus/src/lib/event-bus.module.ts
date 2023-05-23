import { Module } from '@nestjs/common';

import { EventPublisherService } from './services/event-publisher.service';
import { ConnectionManagerService } from './services/connection-manager.service';
import { EventConsumerService } from './services/event-consumer.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
  providers: [EventPublisherService, ConnectionManagerService, EventConsumerService],
})
export class EventBusModule {}
