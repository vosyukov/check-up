import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IntegrationEntity } from '../../integrations/entities/integration.entity';
import { CheckObjectEntity } from './check-object.entity';
import { JoinColumn } from 'typeorm';

export enum CheckIntegrationStatus {
  ON,
  OFF,
}

@Entity()
export class CheckIntegrationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => IntegrationEntity)
  @JoinColumn()
  public integration: IntegrationEntity;

  @ManyToOne(() => CheckObjectEntity, (co) => co.integrations)
  public check: CheckObjectEntity;

  @Column({
    enum: CheckIntegrationStatus,
  })
  public status: CheckIntegrationStatus;
}
