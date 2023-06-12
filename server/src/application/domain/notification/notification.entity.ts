import { randomUUID } from 'crypto';

export class NotificationProperties {
  userId: string;
  description: string;
  readAt?: Date | null;
  createdAt?: Date;
}

export class Notification {
  public readonly id: string;
  private properties: NotificationProperties;

  constructor(properties: NotificationProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = {
      ...this.properties,
      createdAt: properties.createdAt ?? new Date(),
    };
  }

  public get userId(): string {
    return this.properties.userId;
  }

  public set userId(userId: string) {
    this.properties.userId = userId;
  }

  public get readAt(): Date | null | undefined {
    return this.properties.readAt;
  }

  public read(): void {
    this.properties.readAt = new Date();
  }

  public unread(): void {
    this.properties.readAt = null;
  }
}
