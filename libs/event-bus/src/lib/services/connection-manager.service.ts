import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { EXCHANGE_NAME, QUEUE_NAME, ROUTING_KEY } from '../constants';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/esm/AmqpConnectionManager';
import { ChannelWrapper } from 'amqp-connection-manager';
import * as amqp from 'amqp-connection-manager';
import { EventName } from '../events-interfaces';

@Injectable()
export class ConnectionManagerService implements OnModuleInit {
  private connection: IAmqpConnectionManager;
  private channel: ChannelWrapper;

  async onModuleInit() {
    await this.connect();
    await this.createChannel();
  }

  async connect(): Promise<IAmqpConnectionManager> {
    this.connection = amqp.connect(['amqp://localhost']);
    return this.connection;
  }

  async createChannel(): Promise<ChannelWrapper> {
    const channelWrapper = this.connection.createChannel({
      json: true,
    });

    await channelWrapper.addSetup(function (channel) {
      return Promise.all([channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true, autoDelete: false }), channel.assertQueue(QUEUE_NAME, { exclusive: false }), channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY)]);
    });

    this.channel = channelWrapper;

    return channelWrapper;
  }

  getChannel(): ChannelWrapper {
    return this.channel;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async consumer(func: ({ eventName: EventName, payload: any }) => void): Promise<void> {
    this.channel.consume(QUEUE_NAME, async (msg) => {
      if (msg) {
        try {
          const data = JSON.parse(msg.content.toString()) as { eventName: EventName; payload: never };

          await func(data);

          this.channel.ack(msg);
        } catch (err) {
          this.channel.nack(msg);
        }
      }
    });
  }
}
