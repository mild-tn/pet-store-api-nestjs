import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from '../entities/pet.entity';
import { Repository } from 'typeorm';
import { CreatePetDTO } from './dto/create-pet';
import { Categories } from '../entities/category.entity';
import { Status, StatusEnum } from '../entities/status.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async create(createPetDto: CreatePetDTO) {
    const category = await this.categoryRepository.findOneBy({
      category_id: createPetDto.categoryId,
    });
    const status = await this.statusRepository.findOneBy({
      name: StatusEnum.AVAILABLE,
    });
    if (!category) {
      throw new BadRequestException('Category not found.');
    }

    const pet = new Pet();
    pet.name = createPetDto.name;
    pet.photoUrl = createPetDto.photoUrl;
    pet.categoryId = createPetDto.categoryId; // Assuming createPetDto has category property

    const result = await this.petRepository.save(pet);
    return {
      ...result,
      category: category,
      status: status,
    };
  }

  async findById(petId: number) {
    return await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.statusId', 'status')
      .leftJoinAndSelect('pet.categoryId', 'categories')
      .where('pet.pet_id = :id', { id: petId })
      .getOne();
  }

  async findByStatus(status: StatusEnum) {
    return await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.statusId', 'status')
      .leftJoinAndSelect('pet.categoryId', 'categories')
      .where('status.name = :name', { name: status })
      .getMany();
  }

  async findAll() {
    return await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.statusId', 'status')
      .leftJoinAndSelect('pet.categoryId', 'categories')
      .getMany();
  }

  async updateById(payload: CreatePetDTO, petId) {
    const pet = await this.petRepository.findOne(petId);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    const status = await this.statusRepository.findOneBy({
      id: payload.statusId,
    });
    if (!status) {
      throw new NotFoundException('Status not found');
    }

    // Update pet properties
    pet.name = payload.name;
    pet.photoUrl = payload.photoUrl;
    pet.statusId = status.id;
    // Update other properties as needed

    return this.petRepository.save(pet);
  }

  async softDeleteById(petId: number) {
    return this.petRepository.softDelete(petId);
  }
}
