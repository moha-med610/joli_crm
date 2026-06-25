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
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService extends DbRepo<Company> {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {
    super(companyModel);
  }

  async createCompany(data: CreateCompanyDto) {
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

    return {
      msg: 'Company Created Successfully',
      data: newCompany,
    };
  }

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

  async deleteCompany(companyId: string) {
    const company = await this.companyModel.findByIdAndDelete(companyId);
    if (!company) {
      throw new NotFoundException('Company Not Found');
    }

    const user = await this.userModel.findByIdAndDelete(company.user);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return {
      msg: 'Company Deleted Successfully',
    };
  }
}
