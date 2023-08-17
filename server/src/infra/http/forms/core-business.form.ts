import { IsNotEmpty } from 'class-validator';

export class CoreBusinessForm {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
