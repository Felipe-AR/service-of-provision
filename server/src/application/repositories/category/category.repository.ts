import { Category } from 'src/application/domain/category/category.entity';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(category: Category): Promise<Category>;
  update(id: string, category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}