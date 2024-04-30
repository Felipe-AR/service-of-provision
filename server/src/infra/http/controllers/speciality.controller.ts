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

import { CreateSpecialityUseCase } from '@application/use-cases/speciality/create-speciality/create-speciality.use-case';
import { DeleteSpecialityUseCase } from '@application/use-cases/speciality/delete-speciality/delete-speciality.use-case';
import { FindAllSpecialitiesByUserUseCase } from '@application/use-cases/speciality/find-all-specialities-by-user/find-all-specialities-by-user.use-case';
import { FindSpecialityUseCase } from '@application/use-cases/speciality/find-speciality/find-speciality.use-case';
import {
  SpecialityDTO,
  SpecialityViewModel,
} from '../view-models/speciality-view-model';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { UpdateSpecialityUseCase } from '@application/use-cases/speciality/update-speciality/update-speciality.use-case';
import { Role } from '@application/domain';
import { CreateSpecialityForm } from '../forms/create-speciality.form';

@Controller('speciality')
export class SpecialityController {
  constructor(
    private findSpecialityUseCase: FindSpecialityUseCase,
    private findAllSpecialitiesByUserUseCase: FindAllSpecialitiesByUserUseCase,
    private createSpecialityUseCase: CreateSpecialityUseCase,
    private updateSpecialityUseCase: UpdateSpecialityUseCase,
    private deleteSpecialityUseCase: DeleteSpecialityUseCase,
  ) {}

  @Get(':id')
  @Auth()
  async findSpeciality(@Param('id') id: string): Promise<SpecialityDTO> {
    const { speciality } = await this.findSpecialityUseCase.execute({ id });
    return SpecialityViewModel.toHTTP(speciality);
  }

  @Get('/user')
  async findAllSpecialitiesByUser(
    @Request() req: any,
  ): Promise<SpecialityDTO[]> {
    const { specialities } =
      await this.findAllSpecialitiesByUserUseCase.execute({
        serviceProviderId: req.user.id,
      });

    return specialities.map(SpecialityViewModel.toHTTP);
  }

  @Post()
  @Auth(Role.SERVICE_PROVIDER)
  async createSpeciality(
    @Body() form: CreateSpecialityForm,
    @Request() req: any,
  ) {
    const { speciality } = await this.createSpecialityUseCase.execute({
      ...form,
      serviceProviderId: req.user.id,
    });
    return SpecialityViewModel.toHTTP(speciality);
  }

  @Put(':id')
  @Auth(Role.SERVICE_PROVIDER)
  async updateSpeciality(
    @Param('id') id: string,
    @Body() form: CreateSpecialityForm,
    @Request() req: any,
  ): Promise<void> {
    await this.updateSpecialityUseCase.execute({
      id,
      serviceProviderId: req.user.id,
      ...form,
    });
  }

  @Delete(':id')
  @Auth(Role.SERVICE_PROVIDER)
  async deleteSpeciality(@Param('id') id: string) {
    await this.deleteSpecialityUseCase.execute({ id });
  }
}
