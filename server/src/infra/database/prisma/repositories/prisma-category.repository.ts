import { Category } from '@application/domain/category/category.entity';
import { CategoryRepository } from '@application/repositories/category/category.repository';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany();
    return categories.map(PrismaCategoryMapper.toDomain);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async create(category: Category): Promise<Category> {
    const rawCategory = PrismaCategoryMapper.toPrisma(category);
    const createdCategory = await this.prismaService.category.create({
      data: rawCategory,
    });
    return PrismaCategoryMapper.toDomain(createdCategory);
  }

  async save(category: Category): Promise<void> {
    const rawCategory = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.category.update({
      where: { id: rawCategory.id },
      data: { ...rawCategory },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.category.delete({
      where: { id },
    });
  }
}
