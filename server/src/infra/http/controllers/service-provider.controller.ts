import { FindAllServiceProvidersUseCase } from '@application/use-cases/service-provider/find-all-service-providers/find-all-service-providers.use-case';
import { Controller, Get, Param, Request } from '@nestjs/common';
import {
  ServiceProviderDTO,
  ServiceProviderViewModel,
} from '../view-models/service-provider-view-model';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private findAllServiceProvidersUseCase: FindAllServiceProvidersUseCase,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  @Get()
  @Auth()
  public async findAllServiceProviders(): Promise<ServiceProviderDTO[]> {
    const { serviceProviders } =
      await this.findAllServiceProvidersUseCase.execute();

    return serviceProviders.map(ServiceProviderViewModel.toHTTP);
  }

  @Get('/user')
  @Auth()
  public async findServiceProviderByUser(
    @Request() req: any,
  ): Promise<ServiceProviderDTO> {
    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: req.user.id,
    });
    return ServiceProviderViewModel.toHTTP(serviceProvider);
  }

  @Get(':id')
  @Auth()
  public async findServiceProvider(
    @Param('id') id: string,
  ): Promise<ServiceProviderDTO> {
    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: id,
    });
    return ServiceProviderViewModel.toHTTP(serviceProvider);
  }
}
