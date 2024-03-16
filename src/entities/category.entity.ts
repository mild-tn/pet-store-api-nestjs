import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoryEnum {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  FISH = 'FISH',
  RABBIT = 'RABBIT',
  OTHER = 'OTHER',
}

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'enum', enum: CategoryEnum })
  name: CategoryEnum;
}
