import { makeCategory } from '@test/factories/category.factory';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CreateCategoryUseCase } from '../create-category/create-category.use-case';
import { FindCategoryUseCase } from './find-category.use-case';

describe('Find Category', () => {
  it('it should be able to find a category by id', async () => {
    const genericCategory = makeCategory();
    const repository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(repository);
    const findCategoryUseCase = new FindCategoryUseCase(repository);

    const { category } = await createCategoryUseCase.execute({
      name: genericCategory.name,
      description: genericCategory.description,
    });

    const { category: createdCategory } = await findCategoryUseCase.execute({
      id: category.id,
    });

    expect(category.object).toStrictEqual({
      id: createdCategory.object.id,
      name: createdCategory.object.name,
      description: createdCategory.object.description,
    });
  });
});
