import { ClassificationRepository } from '@application/repositories/classification/classification.repository';
import { Injectable } from '@nestjs/common';

export interface AverageUserScoreUseCaseRequest {
  userId: string;
}

export interface AverageUserScoreUseCaseResponse {
  sum: number;
  count: number;
  average: number;
}

@Injectable()
export class AverageUserScoreUseCase {
  constructor(private classificationRepository: ClassificationRepository) {}

  async execute(
    request: AverageUserScoreUseCaseRequest,
  ): Promise<AverageUserScoreUseCaseResponse> {
    const { userId } = request;
    const classifications =
      await this.classificationRepository.findAllByUserRated(userId);

    const sum = classifications.reduce(
      (previousClassification, currentClassification) => {
        return previousClassification + currentClassification.rating;
      },
      0,
    );

    const count = classifications.length;

    const average = sum / count || 0;

    return {
      sum,
      count,
      average,
    };
  }
}
