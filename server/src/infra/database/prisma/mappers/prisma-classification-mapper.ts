import { Classification } from '@application/domain';
import { Classification as RawClassification } from '@prisma/client';

export class PrismaClassificationMapper {
  static toPrisma(classification: Classification): RawClassification {
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

  static toDomain(rawClassification: RawClassification): Classification {
    return new Classification(
      {
        orderId: rawClassification.orderId,
        userClassificationCreatedId:
          rawClassification.userClassificationCreatedId,
        userClassificationRatedId: rawClassification.userClassificationRatedId,
        description: rawClassification.description,
        rating: rawClassification.rating,
        createdAt: rawClassification.createdAt,
        updatedAt: rawClassification.updatedAt,
      },
      rawClassification.id,
    );
  }
}
