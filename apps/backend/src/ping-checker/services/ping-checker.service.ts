import { Injectable } from '@nestjs/common';
import { CheckObjectService, CheckObjectStatus } from '../../check-object/services/check-object.service';
import { Cron } from '@nestjs/schedule';
import { EmailNotificationService } from '../../notification/services/email-notification.service';

@Injectable()
export class PingCheckerService {
  constructor(private readonly checkObjectService: CheckObjectService, private readonly emailNotificationService: EmailNotificationService) {}

  @Cron('59 * * * * *')
  public async handleCron(): Promise<void> {
    const checkObjects = await this.checkObjectService.getCheckObjects();

    for (const co of checkObjects) {
      if (Date.now() / 1000 > co.lastPingTimestamp + co.period + co.grace) {
        if (co.status === CheckObjectStatus.UP) {
          await this.checkObjectService.updateCheckObject(co.userId, {
            id: co.id,
            status: CheckObjectStatus.DOWN,
          });
          await this.emailNotificationService.sendNotification(co.userId, co.id, CheckObjectStatus.DOWN);
        }
      } else {
        if (co.status === CheckObjectStatus.DOWN) {
          this.checkObjectService.updateCheckObject(co.userId, {
            id: co.id,
            status: CheckObjectStatus.UP,
          });
          await this.emailNotificationService.sendNotification(co.userId, co.id, CheckObjectStatus.UP);
        }
      }
    }
  }
}
