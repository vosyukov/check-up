import { Module } from '@nestjs/common';
import { PingHandlerController } from './ping-handler.controller';
import { CheckObjectModule } from '../check-object/check-object.module';
import { PingHandlerService } from './services/ping-handler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PingEntity } from './entities/ping.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [CheckObjectModule, NotificationModule, TypeOrmModule.forFeature([PingEntity])],
  providers: [PingHandlerService],
  controllers: [PingHandlerController],
})
export class PingHandlerModule {}
