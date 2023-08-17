import { InformationEnum } from "./";

export enum ServiceStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export const SERVICE_STATUS_OPTIONS: InformationEnum<ServiceStatus>[] = [
  { label: "Ativo", value: ServiceStatus.ACTIVE },
  { label: "Inativo", value: ServiceStatus.INACTIVE },
  { label: "Bloqueado", value: ServiceStatus.BLOCKED },
];