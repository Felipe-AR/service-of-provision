import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecialityForm {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;
}
