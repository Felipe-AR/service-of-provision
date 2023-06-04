import { Category } from 'src/application/domain/category/category.entity';

export abstract class CategoryRepository {
  abstract findAll(): Promise<Category[]>;
  abstract findById(id: string): Promise<Category | null>;
  abstract create(category: Category): Promise<Category>;
  abstract save(category: Category): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
