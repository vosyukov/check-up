import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { EmailService } from './services/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationEntity } from './entities/integration.entity';
import { MailgunModule } from 'nestjs-mailgun';
import { environment } from '../environments/environment';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationEntity]),
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: environment.mailgunUser,
          key: environment.mailgunKey,
          url: environment.mailgunHost,
          timeout: 10000,
        };
      },
    }),
  ],
  providers: [EmailService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
