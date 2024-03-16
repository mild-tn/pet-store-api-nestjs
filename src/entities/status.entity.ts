import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  SOLD = 'SOLD',
}

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: StatusEnum })
  name: StatusEnum;
}
