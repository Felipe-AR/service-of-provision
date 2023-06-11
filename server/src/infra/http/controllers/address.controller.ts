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
} from '@nestjs/common';
import { AddressForm } from '../forms/address.form';
import { AddressViewModel } from '../view-models/address-view-model';

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
  public async findAllAddresses() {
    const { addresses } = await this.findAllAddressesUseCase.execute();
    return addresses.map(AddressViewModel.toHTTP);
  }

  @Get(':id')
  public async findAddress(@Param('id') id: string) {
    const { address } = await this.findAddressUseCase.execute({ id });
    return AddressViewModel.toHTTP(address);
  }

  @Get('/user/:userId')
  public async findAllAddressesByUser(@Param('userId') userId: string) {
    const { addresses } = await this.findAllAddressesByUserUsecase.execute({
      userId,
    });

    return addresses.map(AddressViewModel.toHTTP);
  }

  @Post()
  public async createAddress(@Body() addressForm: AddressForm) {
    const { address } = await this.createAddressUseCase.execute({
      ...addressForm,
    });

    return AddressViewModel.toHTTP(address);
  }

  @Put(':id')
  public async updateAdress(
    @Param('id') id: string,
    @Body() addressForm: AddressForm,
  ): Promise<void> {
    await this.updateAddressUseCase.execute({ id, ...addressForm });
  }

  @Delete(':id')
  public async deleteAddress(@Param('id') id: string): Promise<void> {
    await this.deleteAddressUseCase.execute({ id });
  }
}
