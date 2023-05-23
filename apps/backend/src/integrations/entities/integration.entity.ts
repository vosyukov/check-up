import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum IntegrationStatus {
  VERIFIED,
  NOT_VERIFIED,
}

export enum IntegrationType {
  EMAIL,
  SLACK,
}

@Entity()
export class IntegrationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public type: IntegrationType;

  @Column()
  public status: IntegrationStatus;

  @Column()
  public userId: string;
}
