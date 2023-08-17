import { PasswordEncoderAdapter } from '@application/adapters/password-encoder.adapter';
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
  address: Omit<CreateAddressUseCaseRequest, 'userId'>;
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
    private passwordEncoderAdapter: PasswordEncoderAdapter,
  ) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { address, ...userRequest } = request;

    const user = new User({
      ...userRequest,
      password: await this.passwordEncoderAdapter.hashPassword(
        userRequest.password,
      ),
    });

    if (await this.userRepository.findByEmail(user.email)) {
      throw new EmailAlreadyExistsException();
    }

    const createdUser = await this.userRepository.create(user);

    await this.createAddressUseCase.execute({
      ...address,
      userId: createdUser.id,
    });

    await this.userRepository.save(createdUser);
    const updatedUser = await this.userRepository.find(createdUser.id);

    return { user: updatedUser };
  }
}
