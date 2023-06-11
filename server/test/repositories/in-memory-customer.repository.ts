import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async findByUser(id: string): Promise<Customer> {
    return this.customers.find((customer) => customer.userId === id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async save(customer: Customer): Promise<void> {
    const index = this.customers
      .map((customer) => customer.id)
      .indexOf(customer.id);

    const customerAlreadyCreated = await this.findByUser(customer.userId);

    this.customers[index] = new Customer(
      {
        ...customerAlreadyCreated['properties'],
        ...customer['properties'],
      },
      customer.id,
    );
  }

  async delete(id: string): Promise<void> {
    const index = this.customers.map((customer) => customer.id).indexOf(id);
    this.customers.splice(index, 1);
  }
}
