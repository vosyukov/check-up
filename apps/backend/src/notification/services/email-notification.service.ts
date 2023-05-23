import { Injectable } from '@nestjs/common';
import { CheckObjectStatus } from '../../check-object/services/check-object.service';
import { UserService } from '../../user/services/user.service';
import { environment } from '../../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const formData = require('form-data');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: environment.mailgunUser,
  key: environment.mailgunKey,
  url: environment.mailgunHost,
});

@Injectable()
export class EmailNotificationService {
  constructor(private readonly userService: UserService) {}

  public async sendNotification(userId: string, checkId: string, status: CheckObjectStatus): Promise<void> {
    const user = await this.userService.getUser({
      id: userId,
    });

    const subject = `${status === CheckObjectStatus.UP ? 'Monitor is UP' : 'Monitor is DOWN'}`;

    await mg.messages.create('check-up.host', {
      from: 'check-up.host <email@check-up.host>',
      to: [user.email],
      subject: `${subject}: ${checkId}`,
      text: `${subject}: ${checkId}`,
    });
  }
}
