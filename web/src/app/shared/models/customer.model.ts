import { Gender } from "./enums";

export class Customer {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  rg: string;
  gender: Gender;
}