import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartItems {
  @PrimaryColumn('uuid')
  cartId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'integer', nullable: false })
  count: number;

  @OneToOne(() => Carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  carts: Carts;
}
