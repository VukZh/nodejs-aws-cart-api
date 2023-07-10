import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusType } from '../../cart';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.OPEN })
  status: StatusType;
}
