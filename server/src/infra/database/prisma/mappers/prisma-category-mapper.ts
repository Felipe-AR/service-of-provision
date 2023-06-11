import { Category } from '@application/domain/category/category.entity';
import { Category as RawCategory } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): RawCategory {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }

  static toDomain(rawCategory: RawCategory): Category {
    return new Category(
      {
        name: rawCategory.name,
        description: rawCategory.description,
      },
      rawCategory.id,
    );
  }
}
