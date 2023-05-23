import { Module } from '@nestjs/common';
import { PingCheckerService } from './services/ping-checker.service';
import { CheckObjectModule } from '../check-object/check-object.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [CheckObjectModule, NotificationModule],
  providers: [PingCheckerService],
})
export class PingCheckerModule {}
