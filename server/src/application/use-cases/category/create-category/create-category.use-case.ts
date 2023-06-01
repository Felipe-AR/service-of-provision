import { Category } from '@application/domain/category/category.entity';
import { CategoryRepository } from '@application/repositories/category/category.repository';

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

interface CreateCategoryResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const category = Category.create(request);
    await this.categoryRepository.create(category);
    return { category };
  }
}
