import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CheckObjectStatus } from '../services/check-object.service';
import { UserEntity } from '../../user/entities/user.entity';

import { CheckIntegrationEntity } from './check-integration.entity';

@Entity()
export class CheckObjectEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToMany(() => CheckIntegrationEntity, (ci) => ci.check)
  integrations: CheckIntegrationEntity[];

  @Column()
  public userId: string;

  @Column()
  public name: string;

  @Column({
    nullable: true,
  })
  public description?: string;

  @Column({
    type: 'int',
    enum: CheckObjectStatus,
  })
  public status: CheckObjectStatus;

  @Column()
  public period: number;

  @Column()
  public grace: number;

  @Column({
    default: Math.round(Date.now() / 1000),
  })
  public lastPingTimestamp: number;
}
