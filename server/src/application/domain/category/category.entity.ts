import { randomUUID } from 'crypto';

export interface CategoryProperties {
  name: string;
  description?: string;
}

// type CategoryObject = CategoryProperties & { id: string };

export class Category {
  public readonly id: string;
  private properties: CategoryProperties;

  private constructor(properties: CategoryProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  public static create(properties: CategoryProperties, id?: string): Category {
    return new Category(properties, id);
  }

  get name(): string {
    return this.properties.name;
  }

  set name(name: string) {
    this.properties.name = name;
  }

  get description(): string {
    return this.properties.description;
  }

  set description(description: string) {
    this.properties.description = description;
  }

  get object() {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
