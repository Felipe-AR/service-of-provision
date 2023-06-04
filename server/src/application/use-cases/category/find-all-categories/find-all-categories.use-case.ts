import { Category } from '@application/domain/category/category.entity';
import { CategoryRepository } from '@application/repositories/category/category.repository';
import { Injectable } from '@nestjs/common';

interface FindAllCategoriesUseCaseResponse {
  categories: Category[];
}

@Injectable()
export class FindAllCategoriesUseCase {
  public constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<FindAllCategoriesUseCaseResponse> {
    const categories = await this.categoryRepository.findAll();
    return { categories };
  }
}
