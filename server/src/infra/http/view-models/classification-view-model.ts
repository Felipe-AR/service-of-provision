import { Classification } from '@application/domain';

export interface ClassificationDTO {
  id: string;
  orderId: string;
  userClassificationCreatedId: string;
  userClassificationRatedId: string;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ClassificationViewModel {
  static toHTTP(classification: Classification): ClassificationDTO {
    return {
      id: classification.id,
      orderId: classification.orderId,
      userClassificationCreatedId: classification.userClassificationCreatedId,
      userClassificationRatedId: classification.userClassificationRatedId,
      description: classification.description,
      rating: classification.rating,
      createdAt: classification.createdAt,
      updatedAt: classification.updatedAt,
    };
  }
}
