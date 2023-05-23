import { Module } from '@nestjs/common';
import { CheckObjectService } from './services/check-object.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckObjectEntity } from './entities/check-object.entity';
import { CheckObjectController } from './check-object.controller';
import { IntegrationEntity } from '../integrations/entities/integration.entity';
import { CheckIntegrationEntity } from './entities/check-integration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckObjectEntity, IntegrationEntity, CheckIntegrationEntity])],
  controllers: [CheckObjectController],
  providers: [CheckObjectService],
  exports: [CheckObjectService],
})
export class CheckObjectModule {}
