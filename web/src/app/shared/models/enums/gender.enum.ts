import { InformationEnum } from "./";

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export const GENDER_OPTIONS: InformationEnum<Gender>[] = [
  { label: 'Masculino', value: Gender.MALE },
  { label: 'Feminino', value: Gender.FEMALE },
  { label: 'Outro', value: Gender.OTHER },
]