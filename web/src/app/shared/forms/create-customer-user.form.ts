import { Gender } from "../models/enums/gender.enum";
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
  addresses: Omit<AddressForm, 'userId'>[];

  constructor() {
    this.addresses = [];
  }
}