import { Request } from 'express';
import { Customer } from 'src/modules/customer/entities/customer.entity';

export interface CustomerUserRequest extends Request {
  user: Customer;
}
