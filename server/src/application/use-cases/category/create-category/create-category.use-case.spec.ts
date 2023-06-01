import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CreateCategoryUseCase } from './create-category.use-case';

describe('Create Category', () => {
  it('should be able to create a category', async () => {
    const request = {
      name: 'Limpeza',
      description: 'Diarista',
    };

    const repository = new InMemoryCategoryRepository();
    const useCase = new CreateCategoryUseCase(repository);
    const response = await useCase.execute(request);
    const categories = await repository.findAll();

    const input = categories[0].object;
    const output = response.category.object;

    expect(output).toStrictEqual({
      id: input.id,
      name: input.name,
      description: input.description,
    });
  });
});
