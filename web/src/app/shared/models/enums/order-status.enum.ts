import { InformationEnum } from './';

export enum OrderStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  COMPLETED = 'COMPLETED',
}

export const ORDER_STATUS_OPTIONS: InformationEnum<OrderStatus>[] = [
  { label: 'Criado', value: OrderStatus.CREATED },
  { label: 'Aceito', value: OrderStatus.ACCEPTED },
  { label: 'Negado', value: OrderStatus.DENIED },
  { label: 'Finalizado', value: OrderStatus.COMPLETED },
]