import { Category } from '@application/domain/category/category.entity';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';
import { CategoryRepository } from '@application/repositories/category/category.repository';

interface FindCategoryUseCaseRequest {
  id: string;
}

interface FindCategoryUseCaseResponse {
  category: Category;
}

export class FindCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: FindCategoryUseCaseRequest,
  ): Promise<FindCategoryUseCaseResponse> {
    const { id } = request;
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ObjectNotFoundException(
        'Does not exists a category with this id',
      );
    }

    return { category };
  }
}
