import {
  CoreBusiness,
  CoreBusinessProperties,
} from '@application/domain/core-business/core-business.entity';

export function makeCoreBusiness(
  override?: Partial<CoreBusinessProperties>,
): CoreBusiness {
  return new CoreBusiness({
    name: 'Pintor',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    ...override,
  });
}
