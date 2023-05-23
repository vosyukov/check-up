import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PingHandlerModule } from './ping-handler/ping-handler.module';
import { CheckObjectModule } from './check-object/check-object.module';
import { AuthModule } from './auth/auth.module';
import { CheckObjectEntity } from './check-object/entities/check-object.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { PingCheckerModule } from './ping-checker/ping-checker.module';
import { UserEntity } from './user/entities/user.entity';
import { PingEntity } from './ping-handler/entities/ping.entity';
import { NotificationModule } from './notification/notification.module';
import { environment } from './environments/environment';
import { IntegrationsModule } from './integrations/integrations.module';
import { IntegrationEntity } from './integrations/entities/integration.entity';
import { CheckIntegrationEntity } from './check-object/entities/check-integration.entity';
import { EventBusModule } from '@check-up/event-bus';

@Module({
  imports: [
    // EventBusModule,
    PingHandlerModule,
    CheckObjectModule,
    AuthModule,
    ScheduleModule.forRoot(),
    PingCheckerModule,
    NotificationModule,

    IntegrationsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.dbHost,
      port: 5432,
      username: environment.dbUsername,
      password: environment.dbPassword,
      database: environment.dbName,
      entities: [CheckObjectEntity, UserEntity, PingEntity, IntegrationEntity, CheckIntegrationEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
