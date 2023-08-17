import { Category, ServiceStatus } from ".";

export class Service {
  id: string;
  name: string;
  category: Category;
  price: number;
  status: ServiceStatus;
}