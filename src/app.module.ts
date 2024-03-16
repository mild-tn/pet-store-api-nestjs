import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../ormconfig';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    PetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
