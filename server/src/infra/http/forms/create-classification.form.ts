import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateClassificationForm {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  description?: string;
}
