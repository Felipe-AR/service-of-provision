import { Classification } from '@application/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ClassificationRepository {
  abstract find(id: string): Promise<Classification | null>;
  abstract findAllByOrder(orderId: string): Promise<Classification[]>;
  abstract findAllByUserRated(userId: string): Promise<Classification[]>;
  abstract create(classification: Classification): Promise<Classification>;
  abstract save(classification: Classification): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
