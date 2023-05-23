import { Module } from '@nestjs/common';
import { EmailNotificationService } from './services/email-notification.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [EmailNotificationService],
  exports: [EmailNotificationService],
})
export class NotificationModule {}
