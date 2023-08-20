import { CustomerAnalyticsCountUseCase } from '@application/use-cases/analytics/customer-analytics-count/customer-analytics-count.use-case';
import { ServiceProviderAnalyticsCountUseCase } from '@application/use-cases/analytics/service-provider-analytics-count/service-provider-analytics-count.use-case';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private customerAnalyticsCountUseCase: CustomerAnalyticsCountUseCase,
    private serviceProviderAnalyticsCountUseCase: ServiceProviderAnalyticsCountUseCase,
  ) {}

  @Get('/customer/:userId')
  async customerAnalyticsCount(@Param(':userId') userId: string) {
    return this.customerAnalyticsCountUseCase.execute({ userId });
  }

  @Get('/service-provider/:userId')
  async serviceProviderAnalyticsCount(@Param(':userId') userId: string) {
    return this.serviceProviderAnalyticsCountUseCase.execute({ userId });
  }
}
