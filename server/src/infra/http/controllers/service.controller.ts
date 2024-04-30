import { ActivateServiceUseCase } from '@application/use-cases/service/activate-service/activate-service.use-case';
import { BlockServiceUseCase } from '@application/use-cases/service/block-service/block-service.use-case';
import { CreateServiceUseCase } from '@application/use-cases/service/create-service/create-service.use-case';
import { FindAllServicesUseCase } from '@application/use-cases/service/find-all-services/find-all-services.use-case';
import { FindServiceUseCase } from '@application/use-cases/service/find-service/find-service.use-case';
import { InactivateServiceUseCase } from '@application/use-cases/service/inactivate-service/inactive-service.use-case';
import { UpdateServiceUseCase } from '@application/use-cases/service/update-service/update-service.use-case';
import {
  ServiceDTO,
  ServiceViewModel,
} from '../view-models/service-view-model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateServiceForm } from '../forms/create-service.form';
import { UpdateServiceForm } from '../forms/update-service.form';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Role } from '@application/domain';

@Controller('service')
export class ServiceController {
  constructor(
    private findAllServicesUseCase: FindAllServicesUseCase,
    private findServiceUseCase: FindServiceUseCase,
    private createServiceUseCase: CreateServiceUseCase,
    private updateServiceUseCase: UpdateServiceUseCase,
    private activateServiceUseCase: ActivateServiceUseCase,
    private inactivateServiceUseCase: InactivateServiceUseCase,
    private blockServiceUseCase: BlockServiceUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllServices(): Promise<ServiceDTO[]> {
    const { services } = await this.findAllServicesUseCase.execute();
    return services.map(ServiceViewModel.toHTTP);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findService(@Param('id') id: string): Promise<ServiceDTO> {
    const { service } = await this.findServiceUseCase.execute({ id });
    return ServiceViewModel.toHTTP(service);
  }

  @Post()
  @Auth(Role.SERVICE_PROVIDER)
  @HttpCode(HttpStatus.CREATED)
  public async createService(
    @Body() form: CreateServiceForm,
    @Request() req: any,
  ): Promise<ServiceDTO> {
    const { service } = await this.createServiceUseCase.execute({
      ...form,
      serviceProviderId: req.user.id,
    });
    return ServiceViewModel.toHTTP(service);
  }

  @Put(':id')
  @Auth(Role.SERVICE_PROVIDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateService(
    @Param('id') id: string,
    @Body() form: UpdateServiceForm,
    @Request() req: any,
  ): Promise<void> {
    await this.updateServiceUseCase.execute({
      id,
      ...form,
      serviceProviderId: req.user.id,
    });
  }

  @Patch(':id/activate')
  @Auth(Role.SERVICE_PROVIDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async activateService(@Param('id') id: string): Promise<void> {
    await this.activateServiceUseCase.execute({ id });
  }

  @Patch(':id/inactivate')
  @Auth(Role.SERVICE_PROVIDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deactivateService(@Param('id') id: string): Promise<void> {
    await this.inactivateServiceUseCase.execute({ id });
  }

  @Delete(':id/block')
  @Auth(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async blockService(@Param('id') id: string): Promise<void> {
    await this.blockServiceUseCase.execute({ id });
  }
}
