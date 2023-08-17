import { Gender } from "../models/enums";
import { AddressForm } from "./address.form";

export class CreateCustomerUserForm {
  email: string;
  password: string;
  phone: string;
  name: string;
  surname: string;
  gender: Gender;
  rg: string;
  cpf: string;
  address: Omit<AddressForm, 'userId'>;
}