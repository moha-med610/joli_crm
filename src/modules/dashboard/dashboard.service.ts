import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schema/users.schema';
import { Model } from 'mongoose';
import { Company } from '../company/schema/company.schema';
import { Customer } from '../customers/schema/customers.schema';
import { Product } from '../products/schema/products.schema';
import { authData } from 'src/common/types/authData.type';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getCompanyDashboard(auth: authData) {
    const companyId = auth.company._id;

    const productsCount = await this.productModel
      .find({ companyId })
      .countDocuments();

    const customerCount = await this.customerModel
      .find({ companyId })
      .countDocuments();

    return {
      msg: 'Dashboard Loaded Successfully',
      data: {
        productsCount,
        customerCount,
      },
    };
  }

  async getAdminDashboard() {}
}
