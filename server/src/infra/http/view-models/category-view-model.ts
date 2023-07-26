import { Category } from '@application/domain/category/category.entity';

export interface CategoryDTO {
  id: string;
  name: string;
  description: string;
}

export class CategoryViewModel {
  public static toHTTP(category: Category): CategoryDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }
}
