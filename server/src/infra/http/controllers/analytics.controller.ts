import { Role } from '@application/domain';
import { CustomerAnalyticsCountUseCase } from '@application/use-cases/analytics/customer-analytics-count/customer-analytics-count.use-case';
import { ServiceProviderAnalyticsCountUseCase } from '@application/use-cases/analytics/service-provider-analytics-count/service-provider-analytics-count.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Controller, Get, Request } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private customerAnalyticsCountUseCase: CustomerAnalyticsCountUseCase,
    private serviceProviderAnalyticsCountUseCase: ServiceProviderAnalyticsCountUseCase,
  ) {}

  @Get('/customer')
  @Auth(Role.CUSTOMER)
  async customerAnalyticsCount(@Request() req: any) {
    return this.customerAnalyticsCountUseCase.execute({ userId: req.user.id });
  }

  @Get('/service-provider')
  @Auth(Role.SERVICE_PROVIDER)
  async serviceProviderAnalyticsCount(@Request() req: any) {
    return this.serviceProviderAnalyticsCountUseCase.execute({
      userId: req.user.id,
    });
  }
}
