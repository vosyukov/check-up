import { Injectable } from '@nestjs/common';
import { MailgunMessageData } from 'mailgun.js/interfaces/Messages';
import { MailgunService } from 'nestjs-mailgun';
import { Repository } from 'typeorm';
import { IntegrationEntity, IntegrationStatus, IntegrationType } from '../entities/integration.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>,
    private readonly mailgunService: MailgunService
  ) {}

  public async add(userId: string, email: string): Promise<void> {
    const integration = await this.integrationRepository.save({
      userId,
      type: IntegrationType.EMAIL,
      status: IntegrationStatus.NOT_VERIFIED,
    });

    const verifyUrl = `https://yyy/${integration.id}`;

    const options: MailgunMessageData = {
      from: 'email@check-up.host',
      to: email,
      subject: 'Verify email address on check-up.host',
      text: verifyUrl,
    };

    await this.mailgunService.createEmail('check-up.host', options);
  }
}
