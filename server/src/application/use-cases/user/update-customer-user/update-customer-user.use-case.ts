import { Gender } from '@application/domain';
import { UserRepository } from '@application/repositories';
import { UpdateCustomerUseCase } from '@application/use-cases/customer/update-customer/update-customer.use-case';
import { Injectable } from '@nestjs/common';

export interface UpdateCustomerUserUseCaseRequest {
  userId: string;
  name: string;
  surname: string;
  phone: string;
  gender: Gender;
}

type UpdateCustomerUserUseCaseResponse = void;

@Injectable()
export class UpdateCustomerUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  async execute(
    request: UpdateCustomerUserUseCaseRequest,
  ): Promise<UpdateCustomerUserUseCaseResponse> {
    await this.updateCustomerUseCase.execute(request);

    const user = await this.userRepository.find(request.userId);

    user.phone = request.phone;

    await this.userRepository.save(user);
  }
}
