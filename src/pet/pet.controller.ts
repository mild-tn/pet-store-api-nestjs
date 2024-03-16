import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { StatusEnum } from './../entities/status.entity';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Post('/')
  async create(@Body() body) {
    const result = await this.petService.create(body);
    return {
      data: {
        id: result.pet_id,
        photoUrls: [result.photoUrl],
        name: result.name,
        category: result.category,
        status: result.status,
      },
    };
  }

  @Get('/:petId')
  async getById(@Param('petId', ParseIntPipe) petId: number) {
    const result = await this.petService.findById(petId);

    if (!result) {
      throw new NotFoundException(`Not found in id=${petId}`);
    }

    return {
      data: {
        id: result.pet_id,
        name: result.name,
        photoUrls: [result?.photoUrl],
        category: result.categoryId,
        status: result.statusId,
      },
    };
  }

  @Get('/')
  async getPets(@Query('status') status: StatusEnum) {
    let result = [];
    if (status) {
      result = await this.petService.findByStatus(status);
    } else {
      result = await this.petService.findAll();
    }

    if (!result) {
      throw new NotFoundException(`Not found in status=${status}`);
    }

    return result.map((item) => ({
      id: item.pet_id,
      name: item.name,
      photoUrls: [item?.photoUrl],
      category: item.categoryId,
      status: item.statusId,
    }));
  }

  @Put('/pet/:petId')
  async updatePet(
    @Param('petId', ParseIntPipe) petId: number,
    @Body() payload,
  ) {
    const pet = await this.petService.findById(petId);

    if (!pet) {
      throw new NotFoundException(`Not found in id=${petId}`);
    }

    const updatedResult = await this.petService.updateById(payload, petId);
    return updatedResult;
  }

  @Delete('/:petId')
  async deletePet(@Param('petId', ParseIntPipe) petId: number) {
    const pet = await this.petService.findById(petId);

    if (!pet) {
      throw new NotFoundException(`Not found in id=${petId}`);
    }

    const deleted = await this.petService.softDeleteById(pet.pet_id);
    const message =
      deleted.affected > 0
        ? `Pet ID = ${petId} is already deleted.`
        : 'Fail to delete';

    return { result: message };
  }
}
