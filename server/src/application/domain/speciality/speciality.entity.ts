import { randomUUID } from 'crypto';

export interface SpecialityProperties {
  serviceProviderId: string;
  name: string;
  description: string;
}

export type SpecialityObject = SpecialityProperties & { id: string };

export class Speciality {
  public readonly id: string;
  private properties: SpecialityProperties;

  constructor(properties: SpecialityProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  get serviceProviderId(): string {
    return this.properties.serviceProviderId;
  }

  set serviceProviderId(serviceProviderId: string) {
    this.properties.serviceProviderId = serviceProviderId;
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

  get object(): SpecialityObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
