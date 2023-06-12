import {
  Classification,
  ClassificationProperties,
} from '@application/domain/classification/classification.entity';

export function makeClassification(override?: ClassificationProperties) {
  return new Classification({
    orderId: 'fake-order-id',
    rating: 5,
    userClassificationCreatedId: 'fake-user-classification-created-id',
    userClassificationRatedId: 'fake-user-classification-rated-id',
    description: 'lorem ipsum dolor sit amet, consectetur adip',
    ...override,
  });
}
