import { randomUUID } from 'crypto';

export interface ClassificationProperties {
  orderId: string;
  userClassificationCreatedId: string;
  userClassificationRatedId: string;
  rating: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ClassificationObject = ClassificationProperties & { id: string };

export class Classification {
  public readonly id: string;
  private properties: ClassificationProperties;

  constructor(properties: ClassificationProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = {
      ...properties,
      createdAt: properties.createdAt ?? new Date(),
      updatedAt: properties.updatedAt ?? new Date(),
    };
  }

  get orderId(): string {
    return this.properties.orderId;
  }

  set orderId(orderId: string) {
    this.properties.orderId = orderId;
  }

  get userClassificationCreatedId(): string {
    return this.properties.userClassificationCreatedId;
  }

  set userClassificationCreatedId(userClassificationCreatedId: string) {
    this.properties.userClassificationCreatedId = userClassificationCreatedId;
  }

  get userClassificationRatedId(): string {
    return this.properties.userClassificationRatedId;
  }

  set userClassificationRatedId(userClassificationRatedId: string) {
    this.properties.userClassificationRatedId = userClassificationRatedId;
  }

  get rating(): number {
    return this.properties.rating;
  }

  set rating(rating: number) {
    this.properties.rating = rating;
  }

  get description(): string {
    return this.properties.description;
  }

  set description(description: string) {
    this.properties.description = description;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.properties.createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this.properties.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.properties.updatedAt = updatedAt;
  }

  get object(): ClassificationObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
