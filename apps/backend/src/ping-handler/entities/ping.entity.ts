import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PingEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public checkObjectId: string;

  @Column()
  public status: string;
}
