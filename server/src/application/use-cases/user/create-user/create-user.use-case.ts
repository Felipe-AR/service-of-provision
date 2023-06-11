import { Address } from '@application/domain/address/address.entity';
import { Role } from '@application/domain/user/role.enum';
import { User } from '@application/domain/user/user.entity';
import { EmailAlreadyExistsException } from '@application/exceptions/email-already-exists.exception';
import { UserRepository } from '@application/repositories/user/user.repository';
import {
  CreateAddressUseCase,
  CreateAddressUseCaseRequest,
} from '@application/use-cases/address/create-address/create-address.use-case';
import { Injectable } from '@nestjs/common';

export interface CreateUserUseCaseRequest {
  email: string;
  password: string;
  phone: string;
  role: Role;
  addresses?: Omit<CreateAddressUseCaseRequest, 'userId'>[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private createAddressUseCase: CreateAddressUseCase,
  ) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { addresses, ...userRequest } = request;
    const user = new User(userRequest);

    if (await this.userRepository.findByEmail(user.email)) {
      throw new EmailAlreadyExistsException();
    }

    const createdUser = await this.userRepository.create(user);

    if (addresses && addresses.length > 0) {
      createdUser.addresses = await Promise.all(
        addresses.map(async (address) => {
          const createdAddress = await this.createAddressUseCase.execute({
            ...address,
            userId: createdUser.id,
          });
          return createdAddress.address;
        }),
      );
    }

    await this.userRepository.save(createdUser);
    const udpatedUser = await this.userRepository.find(createdUser.id);

    return { user: udpatedUser };
  }
}
