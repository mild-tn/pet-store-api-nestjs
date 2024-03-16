import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from './../entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './../entities/category.entity';
import { Status } from './../entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Categories, Status])],
  providers: [PetService, Categories, Status],
  controllers: [PetController],
})
export class PetModule {}
