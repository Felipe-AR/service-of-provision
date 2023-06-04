import { CategoryRepository } from '@application/repositories/category/category.repository';
import { FindCategoryUseCase } from '../find-category/find-category.use-case';
import { Injectable } from '@nestjs/common';

interface DeleteCategoryUseCaseRequest {
  id: string;
}

type DeleteCategoryUseCaseResponse = void;

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private findCategoryUseCase: FindCategoryUseCase,
  ) {}

  async execute(
    request: DeleteCategoryUseCaseRequest,
  ): Promise<DeleteCategoryUseCaseResponse> {
    const { category } = await this.findCategoryUseCase.execute(request);
    await this.categoryRepository.delete(category.id);
  }
}
