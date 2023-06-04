import { Category } from '@application/domain/category/category.entity';
import { CategoryRepository } from '@application/repositories/category/category.repository';
import { Injectable } from '@nestjs/common';

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

interface CreateCategoryResponse {
  category: Category;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const category = new Category(request);
    const createdCategory = await this.categoryRepository.create(category);
    return { category: createdCategory };
  }
}
