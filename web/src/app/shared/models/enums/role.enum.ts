import { InformationEnum } from "./";

export enum Role {
  CUSTOMER = 'CUSTOMER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export const ROLE_OPTIONS: InformationEnum<Role>[] = [
  { label: 'Cliente', value: Role.CUSTOMER },
  { label: 'Prestador de Serviço', value: Role.SERVICE_PROVIDER },
  { label: 'Administrador', value: Role.ADMINISTRATOR },
];