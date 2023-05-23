import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PingEntity } from '../entities/ping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckObjectService, CheckObjectStatus } from '../../check-object/services/check-object.service';
import { EmailNotificationService } from '../../notification/services/email-notification.service';

@Injectable()
export class PingHandlerService {
  constructor(
    @InjectRepository(PingEntity)
    private readonly pingRepository: Repository<PingEntity>,
    private readonly checkObjectService: CheckObjectService,
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  public async handleOk(checkObjectId: string): Promise<string> {
    const checkObject = await this.checkObjectService.getCheckObject(checkObjectId);
    const ping = await this.pingRepository.save({
      checkObjectId: checkObject.id,
      status: 'OK',
    });
    const timestamp = Math.round(Date.now() / 1000);

    if (checkObject.status === CheckObjectStatus.DOWN) {
      await this.checkObjectService.updateCheckObject(checkObject.userId, {
        id: checkObject.id,
        lastPingTimestamp: timestamp,
        status: CheckObjectStatus.UP,
      });

      await this.emailNotificationService.sendNotification(checkObject.userId, checkObject.id, CheckObjectStatus.UP);
    } else {
      await this.checkObjectService.updateCheckObject(checkObject.userId, {
        id: checkObject.id,
        lastPingTimestamp: timestamp,
        status: CheckObjectStatus.UP,
      });
    }

    return ping.id;
  }
}
