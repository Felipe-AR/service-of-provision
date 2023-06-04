import { CategoryRepository } from '@application/repositories/category/category.repository';
import { Category } from '@application/domain/category/category.entity';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';
import { Injectable } from '@nestjs/common';

export interface UpdateCategoryUseCaseRequest {
  id: string;
  name: string;
  description: string;
}

type UpdateCategoryUseCaseResponse = void;

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: UpdateCategoryUseCaseRequest,
  ): Promise<UpdateCategoryUseCaseResponse> {
    const { id, ...updatedCategory } = request;

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ObjectNotFoundException('This category was not found');
    }

    await this.categoryRepository.save(
      new Category({ ...updatedCategory }, id),
    );
  }
}
