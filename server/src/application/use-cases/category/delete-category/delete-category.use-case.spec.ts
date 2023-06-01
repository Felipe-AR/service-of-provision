import { makeCategory } from '@test/factories/category.factory';
import { CreateCategoryUseCase } from '../create-category/create-category.use-case';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { DeleteCategoryUseCase } from './delete-category.use-case';
import { FindCategoryUseCase } from '../find-category/find-category.use-case';

describe('Delete Category', () => {
  it('should be able to delete a category', async () => {
    const genericCategory = makeCategory();
    const repository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(repository);
    const findCategoryUseCase = new FindCategoryUseCase(repository);
    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      repository,
      findCategoryUseCase,
    );
    const categories = await repository.findAll();

    const { category } = await createCategoryUseCase.execute({
      name: genericCategory.name,
      description: genericCategory.description,
    });

    expect(categories).toHaveLength(1);

    await deleteCategoryUseCase.execute({ id: category.id });

    expect(categories).toHaveLength(0);
  });
});
