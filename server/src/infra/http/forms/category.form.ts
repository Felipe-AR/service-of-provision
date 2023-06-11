import { IsNotEmpty } from 'class-validator';

export class CategoryForm {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
