import {
  ServiceProvider,
  ServiceProviderProperties,
} from '@application/domain/service-provider/service-provider.entity';

export function makeServiceProvider(override?: ServiceProviderProperties) {
  return new ServiceProvider({
    coreBusinessId: 'fake-core-business-id',
    cnpj: '00.111.222/0001-01',
    companyName: 'fake-company-name',
    services: [],
    speciality: [],
    ...override,
  });
}
