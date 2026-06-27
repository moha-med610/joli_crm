import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Customer } from './schema/customers.schema';
import { EncryptionService } from '../../common/modules/encryption/encryption.service';
import { authData } from 'src/common/types/authData.type';
import { DbRepo } from 'src/repos/db.repo';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService extends DbRepo<Customer> {
  constructor(
    @InjectModel('Customer') private CustomersModel: Model<Customer>,
    private readonly encryptionService: EncryptionService,
  ) {
    super(CustomersModel);
  }

  async createCustomer(auth: authData, data: CreateCustomerDto) {
    const companyId = auth.company?._id;
    const { name, phone, address, city, whatsapp, notes } = data;

    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const encryptPhone = this.encryptionService.encrypt(phone);
    const encryptWhatsapp = whatsapp
      ? this.encryptionService.encrypt(whatsapp)
      : null;

    const newCustomer = await this.CustomersModel.create({
      companyId,
      name,
      phone: encryptPhone,
      address,
      city,
      whatsapp: encryptWhatsapp as string,
      notes,
    });

    return {
      msg: 'Customer Created Successfully',
      data: newCustomer,
    };
  }

  async getCustomerById(auth: authData, customerId: string) {
    const companyId = auth.company?._id;

    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const customer = await this.CustomersModel.findOne({
      _id: customerId,
      companyId,
    });

    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }

    return {
      msg: 'Customer Received Successfully',
      data: customer,
    };
  }

  async getCustomers(auth: authData, page: number = 1, limit: number = 20) {
    const companyId = auth.company?._id;

    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const customers = await this.findWithPagination({
      filter: { companyId },
      page,
      limit,
      path: '',
      sort: { createdAt: -1 },
    });

    return {
      msg: 'Customers Received Successfully',
      data: customers,
    };
  }

  async searchCustomers(auth: authData, name: string) {
    const companyId = auth.company?._id;
    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const customers = await this.CustomersModel.find({
      companyId,
      $or: [
        {
          name: { $regex: name, $options: 'i' },
        },
      ],
    });

    return {
      msg: 'Customers Received Successfully',
      data: customers,
    };
  }

  async updateCustomer(
    auth: authData,
    customerId: string,
    data: UpdateCustomerDto,
  ) {
    const companyId = auth.company?._id;
    const { name, phone, address, city, whatsapp, notes } = data;

    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const encryptPhone = this.encryptionService.encrypt(phone);
    const encryptWhatsapp = whatsapp
      ? this.encryptionService.encrypt(whatsapp)
      : null;

    const updateCustomer = await this.CustomersModel.findOneAndUpdate(
      {
        _id: customerId,
        companyId,
      },
      {
        name,
        phone: encryptPhone,
        address,
        city,
        whatsapp: encryptWhatsapp,
        notes,
      },
      {
        returnDocument: 'after',
      },
    );
    if (!updateCustomer) {
      throw new NotFoundException('Customer Not Found');
    }

    return {
      msg: 'Customer Updated Successfully',
      data: updateCustomer,
    };
  }

  async deleteCustomer(auth: authData, customerId: string) {
    const companyId = auth.company?._id;

    if (!companyId) {
      throw new NotFoundException('Company Not Found');
    }

    const deleteUser = await this.CustomersModel.findOneAndDelete({
      _id: customerId,
      companyId,
    });

    if (!deleteUser) {
      throw new BadRequestException('Customer Not Found');
    }

    return {
      msg: 'Customer Deleted Successfully',
      data: {},
    };
  }
}
