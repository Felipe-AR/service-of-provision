import { randomUUID } from 'crypto';

export interface CoreBusinessProperties {
  name: string;
  description: string;
}

export type CoreBusinessObject = CoreBusinessProperties & { id: string };

export class CoreBusiness {
  public readonly id: string;
  private properties: CoreBusinessProperties;

  constructor(properties: CoreBusinessProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
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

  get object(): CoreBusinessObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
