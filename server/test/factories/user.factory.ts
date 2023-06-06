import { Role } from '@application/domain/user/role.enum';
import { User, UserObject } from '@application/domain/user/user.entity';

export function makeUser(override?: Partial<UserObject>) {
  return new User({
    email: 'john.doe@gmail.com',
    password: 'john123456',
    phone: '(11) 4002-8922',
    role: Role.CUSTOMER,
    ...override,
  });
}
