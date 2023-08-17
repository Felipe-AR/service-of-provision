import { FindAllServiceProvidersUseCase } from '@application/use-cases/service-provider/find-all-service-providers/find-all-service-providers.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ServiceProviderDTO,
  ServiceProviderViewModel,
} from '../view-models/service-provider-view-model';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private findAllServiceProvidersUseCase: FindAllServiceProvidersUseCase,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  @Get()
  public async findAllServiceProviders(): Promise<ServiceProviderDTO[] | any> {
    const { serviceProviders } =
      await this.findAllServiceProvidersUseCase.execute();

    return serviceProviders.map(ServiceProviderViewModel.toHTTP);
  }

  @Get(':id')
  public async findServiceProvider(
    @Param('userId') userId: string,
  ): Promise<ServiceProviderDTO> {
    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId,
    });
    return ServiceProviderViewModel.toHTTP(serviceProvider);
  }
}
