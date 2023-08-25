import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { DeleteAddressUseCase } from '@application/use-cases/address/delete-address/delete-address.use-case';
import { FindAddressUseCase } from '@application/use-cases/address/find-address/find-address.use-case';
import { FindAllAddressesByUserUseCase } from '@application/use-cases/address/find-all-addresses-by-user/find-all-addresses-by-user.use-case';
import { FindAllAddressesUseCase } from '@application/use-cases/address/find-all-addresses/find-all-addresses.use-case';
import { UpdateAddressUseCase } from '@application/use-cases/address/update-address/update-address.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  AddressDTO,
  AddressViewModel,
} from '../view-models/address-view-model';
import { CreateAddressForm } from '../forms/create-address.form';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Role } from '@application/domain';

@Controller('address')
export class AddressController {
  constructor(
    private findAddressUseCase: FindAddressUseCase,
    private findAllAddressesUseCase: FindAllAddressesUseCase,
    private findAllAddressesByUserUsecase: FindAllAddressesByUserUseCase,
    private createAddressUseCase: CreateAddressUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
    private deleteAddressUseCase: DeleteAddressUseCase,
  ) {}

  @Get()
  @Auth(Role.ADMINISTRATOR)
  public async findAllAddresses(): Promise<AddressDTO[]> {
    const { addresses } = await this.findAllAddressesUseCase.execute();
    return addresses.map(AddressViewModel.toHTTP);
  }

  @Get('/user')
  @Auth()
  public async findAllAddressesByUser(
    @Request() req: any,
  ): Promise<AddressDTO[]> {
    const { addresses } = await this.findAllAddressesByUserUsecase.execute({
      userId: req.user.id,
    });

    return addresses.map(AddressViewModel.toHTTP);
  }

  @Get(':id')
  @Auth(Role.ADMINISTRATOR)
  public async findAddress(@Param('id') id: string): Promise<AddressDTO> {
    const { address } = await this.findAddressUseCase.execute({ id });
    return AddressViewModel.toHTTP(address);
  }

  @Post()
  @Auth()
  public async createAddress(
    @Body() form: CreateAddressForm,
    @Request() req: any,
  ) {
    const { address } = await this.createAddressUseCase.execute({
      ...form,
      userId: req.user.id,
    });

    return AddressViewModel.toHTTP(address);
  }

  @Put(':id')
  @Auth()
  public async updateAdress(
    @Param('id') id: string,
    @Body() form: CreateAddressForm,
    @Request() req: any,
  ): Promise<void> {
    await this.updateAddressUseCase.execute({
      id,
      ...form,
      userId: req.user.id,
    });
  }

  @Delete(':id')
  public async deleteAddress(@Param('id') id: string): Promise<void> {
    await this.deleteAddressUseCase.execute({ id });
  }
}
