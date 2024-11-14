import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusEnum } from 'src/enums/status.enum';

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @Column({ type: 'text', nullable: true})
  userId: string;
}
