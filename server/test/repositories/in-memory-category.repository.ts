import { CategoryProperties } from '@application/domain/category/category.entity';
import { Category } from '@application/domain/category/category.entity';
import { CategoryRepository } from '@application/repositories/category/category.repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);
    return category;
  }

  async create(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async update(id: string, updatedCategory: CategoryProperties): Promise<void> {
    const index = this.categories.map((category) => category.id).indexOf(id);
    const categoryAlreadyCreated = await this.findById(id);

    this.categories[index] = new Category(
      {
        ...categoryAlreadyCreated['properties'],
        ...updatedCategory,
      },
      id,
    );
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.map((category) => category.id).indexOf(id);
    this.categories.splice(index, 1);
  }
}
