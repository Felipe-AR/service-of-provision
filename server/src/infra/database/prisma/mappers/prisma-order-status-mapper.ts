import { OrderStatus } from '@application/domain';
import { OrderStatus as RawOrderStatus } from '@prisma/client';

export class PrismaOrderStatusMapper {
  static toPrisma(orderStatus: OrderStatus) {
    return RawOrderStatus[orderStatus];
  }

  static toDomain(rawOrderStatus: RawOrderStatus) {
    return OrderStatus[rawOrderStatus];
  }
}
