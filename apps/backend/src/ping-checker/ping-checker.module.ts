import { Module } from '@nestjs/common';
import { PingCheckerService } from './services/ping-checker.service';
import { CheckObjectModule } from '../check-object/check-object.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CheckObjectModule, NotificationModule, UserModule],
  providers: [PingCheckerService],
})
export class PingCheckerModule {}
