import {
  Category,
  CategoryProperties,
} from '@application/domain/category/category.entity';

export function makeCategory(override?: Partial<CategoryProperties>) {
  return new Category({
    name: 'Manutenção',
    description: 'Máquinas, equipamentos, ferramentas e instalações.',
    ...override,
  });
}
