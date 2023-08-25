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

    const classificationsByOrder =
      await this.classificationRepository.findAllByOrder(orderId);

    const userAlreadySubmittedClassification = classificationsByOrder.some(
      (classification) =>
        classification.userClassificationCreatedId ===
        userClassificationCreatedId,
    );

    if (userAlreadySubmittedClassification) {
      throw new BadRequestException(
        'O usuário já enviou a classificação deste pedido.',
      );
    }

    const { user } = await this.findUserUseCase.execute({
      id: userClassificationCreatedId,
    });

    const { order } = await this.findOrderUseCase.execute({
      id: orderId,
    });

    if (order.status !== OrderStatus.COMPLETED) {
      throw new BadRequestException('A classificação não pode ser enviada.');
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
