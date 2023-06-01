import { CategoryRepository } from '@application/repositories/category/category.repository';
import { FindCategoryUseCase } from '../find-category/find-category.use-case';
import { Category } from '@application/domain/category/category.entity';

export interface UpdateCategoryUseCaseRequest {
  id: string;
  name: string;
  description: string;
}

type UpdateCategoryUseCaseResponse = void;

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private findCategoryUseCase: FindCategoryUseCase,
  ) {}

  async execute(
    request: UpdateCategoryUseCaseRequest,
  ): Promise<UpdateCategoryUseCaseResponse> {
    const { id, ...updatedCategory } = request;

    Promise.all([
      this.findCategoryUseCase.execute({ id }),
      this.categoryRepository.update(id, updatedCategory),
    ]);
  }
}
