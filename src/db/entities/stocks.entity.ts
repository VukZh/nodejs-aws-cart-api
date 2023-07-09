import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class Stocks {

  @PrimaryColumn('uuid')
  productId: string;


  @Column({ type: 'integer', nullable: true })
  count: number;

  @OneToOne(() => Products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  products: Products;

}
