import { Classification, OrderStatus, Role } from '@application/domain';
import { ClassificationRepository } from '@application/repositories/classification/classification.repository';
import { FindOrderUseCase } from '@application/use-cases/order/find-order/find-order.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface SendClassificationUseCaseRequest {
  orderId: string;
  rating: number;
  userClassificationCreatedId: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SendClassificationUseCaseResponse {
  classification: Classification;
}

@Injectable()
export class SendClassificationUseCase {
  constructor(
    private classificationRepository: ClassificationRepository,
    private findOrderUseCase: FindOrderUseCase,
    private findUserUseCase: FindUserUseCase,
  ) {}

  async execute(
    request: SendClassificationUseCaseRequest,
  ): Promise<SendClassificationUseCaseResponse> {
    const {
      orderId,
      rating,
      userClassificationCreatedId,
      createdAt,
      description,
      updatedAt,
    } = request;

    const { user } = await this.findUserUseCase.execute({
      id: userClassificationCreatedId,
    });

    const { order } = await this.findOrderUseCase.execute({
      id: orderId,
    });

    if (order.status !== OrderStatus.COMPLETED) {
      throw new BadRequestException('Classification cannot be submitted.');
    }

    const userClassificationRatedId =
      user.role === Role.CUSTOMER
        ? order.serviceProvider.user.id
        : order.customer.user.id;

    const classification = new Classification({
      orderId: order.id,
      rating,
      userClassificationCreatedId,
      userClassificationRatedId,
      createdAt,
      description,
      updatedAt,
    });

    const createdClassification = await this.classificationRepository.create(
      classification,
    );

    return { classification: createdClassification };
  }
}
