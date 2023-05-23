import { CheckIntegrationStatus } from '../entities/check-integration.entity';

export class EnableIntegrationDto {
  public checkId: string;
  public integrationId: string;
  public status: CheckIntegrationStatus;
}
