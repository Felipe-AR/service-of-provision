import { Category } from '@application/domain/category/category.entity';
import { makeCategory } from '@test/factories/category.factory';
import { CreateCategoryUseCase } from '../create-category/create-category.use-case';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case';

describe('Find All Categories', () => {
  it('should be able to find all categories', async () => {
    const genericCategories: Category[] = [
      makeCategory(),
      makeCategory(),
      makeCategory(),
    ];

    const repository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(repository);
    const findAllCategoriesUseCase = new FindAllCategoriesUseCase(repository);

    const createdCategories: Category[] = await Promise.all(
      genericCategories.map(async (category) => {
        const createdCategory = await createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        });
        return createdCategory.category;
      }),
    );

    const { categories } = await findAllCategoriesUseCase.execute();

    expect(createdCategories.length).toBe(categories.length);
    expect(createdCategories).toStrictEqual(categories);
  });
});
