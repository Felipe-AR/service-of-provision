import { SendClassificationUseCase } from '@application/use-cases/classification/send-classification/send-classification.use-case';
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateClassificationForm } from '../forms/create-classification.form';
import {
  ClassificationDTO,
  ClassificationViewModel,
} from '../view-models/classification-view-model';
import { AverageUserScoreUseCase } from '@application/use-cases/classification/average-user-score/average-user-score.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';

@Controller('classification')
export class ClassificationController {
  constructor(
    private sendClassificationUseCase: SendClassificationUseCase,
    private averageUserScoreUseCase: AverageUserScoreUseCase,
  ) {}

  @Get('/user')
  @Auth()
  public async averageUserScore(@Request() req: any) {
    return this.averageUserScoreUseCase.execute({ userId: req.user.id });
  }

  @Post('/order/:id')
  @Auth()
  async sendClassification(
    @Param('id') id: string,
    @Body() form: CreateClassificationForm,
    @Request() req: any,
  ): Promise<ClassificationDTO> {
    const { classification } = await this.sendClassificationUseCase.execute({
      ...form,
      orderId: id,
      userClassificationCreatedId: req.user.id,
    });
    return ClassificationViewModel.toHTTP(classification);
  }
}
