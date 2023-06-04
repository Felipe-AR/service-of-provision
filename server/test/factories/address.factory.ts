import {
  Address,
  AddressProperties,
} from '@application/domain/address/address.entity';

export function makeAddress(override?: Partial<AddressProperties>) {
  return new Address({
    userId: '7e111e0b-8bdc-4ef5-83e1-fadcfabf22e1',
    street: 'Av. Getúlio Vargas',
    num: '1200',
    district: 'Vila Nova Santana',
    city: 'Assis',
    state: 'SP',
    zipCode: '19807-130',
    ...override,
  });
}
