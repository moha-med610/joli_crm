import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schema/company.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User, UserDocument } from '../auth/schema/users.schema';
import { DbRepo } from 'src/repos/db.repo';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class CompanyService extends DbRepo<Company> {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {
    super(companyModel);
  }

  // Create User and Company 
  async createUserAndCompany(data: CreateCompanyDto) {
    const { fullName, email, phone, companyName, address, city } = data;

    const isEmailExist = await this.userModel.findOne({ email });

    if (isEmailExist) {
      throw new BadRequestException('This Email Already In Use');
    }
    const user = await this.authService.createUser({
      fullName,
      email,
      phone,
    });

    const newCompany = await this.companyModel.create({
      user: (user as UserDocument)._id,
      companyName,
      address,
      city,
    });

    await this.cache.clear();

    return {
      msg: 'Company Created Successfully',
      data: newCompany,
    };
  }

  // Get Company by ID
  async getCompanyById(companyId: string) {
    const company = await this.companyModel
      .findById(companyId)
      .populate('user', '-password');

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }

    return {
      msg: 'Company Retrieved Successfully',
      data: company,
    };
  }

  // Get All Companies with Pagination
  async getAllCompanies(page: number = 1, limit: number = 20) {
    const companies = await this.findWithPagination({
      page,
      limit,
      path: 'user',
      select: '-password',
    });

    return {
      msg: 'Companies Retrieved Successfully',
      data: companies,
    };
  }

  // Delete Company and User associated with it
  // must delete all company related data
  // like customers, invoices, payments, etc.
  async deleteCompany(companyId: string) {
    
    const company = await this.companyModel.findById(companyId);

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }

    Promise.all([
      await this.userModel.findByIdAndDelete(company.user),
      await company.deleteOne(),
      await this.cache.clear(),
    ]);
    

    return {
      msg: 'Company Deleted Successfully',
    };
  }
}
