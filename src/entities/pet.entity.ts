import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Categories } from './category.entity';
import { Status } from './status.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  pet_id: number;

  @Column()
  name: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  statusId: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
