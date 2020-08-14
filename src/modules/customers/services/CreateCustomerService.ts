import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerExist = await this.customersRepository.findByEmail(email);

    if(customerExist) {
      throw new AppError('Customer already registred with this e-mail');
    }

    const consumer = await this.customersRepository.create({name, email});

    return consumer;
  }
}

export default CreateCustomerService;
