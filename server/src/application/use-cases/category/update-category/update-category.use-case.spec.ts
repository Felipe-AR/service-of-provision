import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { FindCategoryUseCase } from '../find-category/find-category.use-case';
import { UpdateCategoryUseCase } from './update-category.use-case';
import { CreateCategoryUseCase } from '../create-category/create-category.use-case';
import { FindAllCategoriesUseCase } from '../find-all-categories/find-all-categories.use-case';

describe('Update Category', () => {
  it('should be able to update a category', async () => {
    const repository = new InMemoryCategoryRepository();
    const findCategoryUseCase = new FindCategoryUseCase(repository);
    const createCategoryUseCase = new CreateCategoryUseCase(repository);
    const findAllCategoriesUseCase = new FindAllCategoriesUseCase(repository);
    const { categories } = await findAllCategoriesUseCase.execute();

    const { category: createdCategory } = await createCategoryUseCase.execute({
      name: 'AAA'.repeat(10),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    });

    const updateCategoryUseCase = new UpdateCategoryUseCase(
      repository,
      findCategoryUseCase,
    );

    const updatedCategory = {
      id: createdCategory.id,
      name: 'Assistência',
      description: 'Técnica',
    };

    await updateCategoryUseCase.execute({
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description,
    });

    expect(categories[0].object).toStrictEqual({
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description,
    });
  });
});
