import { CreateCoreBusinessUseCase } from '@application/use-cases/core-business/create-core-business/create-core-business.use-case';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CoreBusinessDTO,
  CoreBusinessViewModel,
} from '../view-models/core-business-view-model';
import { CoreBusinessForm } from '../forms/core-business.form';
import { FindCoreBusinessUseCase } from '@application/use-cases/core-business/find-core-business/find-core-business.use-case';
import { FindAllCoreBusinessesUseCase } from '@application/use-cases/core-business/find-all-core-businesses/find-all-core-businesses.use-case';

@Controller('core-business')
export class CoreBusinessController {
  constructor(
    private createCoreBusinessUseCase: CreateCoreBusinessUseCase,
    private findCoreBusinessUseCase: FindCoreBusinessUseCase,
    private findAllCoreBusinessesUseCase: FindAllCoreBusinessesUseCase,
  ) {}

  @Get()
  public async findAllCoreBusinesses(): Promise<CoreBusinessDTO[]> {
    const { coreBusinesses } =
      await this.findAllCoreBusinessesUseCase.execute();
    return coreBusinesses.map(CoreBusinessViewModel.toHTTP);
  }

  @Get(':id')
  public async findCoreBusiness(
    @Param('id') id: string,
  ): Promise<CoreBusinessDTO> {
    const { coreBusiness } = await this.findCoreBusinessUseCase.execute({
      id,
    });
    return CoreBusinessViewModel.toHTTP(coreBusiness);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createCoreBusiness(
    @Body() form: CoreBusinessForm,
  ): Promise<CoreBusinessDTO> {
    const { coreBusiness } = await this.createCoreBusinessUseCase.execute(form);
    return CoreBusinessViewModel.toHTTP(coreBusiness);
  }
}
