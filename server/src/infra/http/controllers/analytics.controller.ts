import { Role } from '@application/domain';
import { CustomerAnalyticsCountUseCase } from '@application/use-cases/analytics/customer-analytics-count/customer-analytics-count.use-case';
import { ServiceProviderAnalyticsCountUseCase } from '@application/use-cases/analytics/service-provider-analytics-count/service-provider-analytics-count.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Controller, Get, Param, Request } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private customerAnalyticsCountUseCase: CustomerAnalyticsCountUseCase,
    private serviceProviderAnalyticsCountUseCase: ServiceProviderAnalyticsCountUseCase,
  ) {}

  @Auth(Role.CUSTOMER)
  @Get('/customer')
  async customerAnalyticsCount(@Request() req: any) {
    return this.customerAnalyticsCountUseCase.execute({ userId: req.user.id });
  }

  @Auth(Role.SERVICE_PROVIDER)
  @Get('/service-provider/:userId')
  async serviceProviderAnalyticsCount(@Param(':userId') userId: string) {
    return this.serviceProviderAnalyticsCountUseCase.execute({ userId });
  }
}
