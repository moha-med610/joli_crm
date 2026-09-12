import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/userRole.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateCompanyDto } from './dto/company.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Roles(Role.ADMIN)
  @Post('create-company')
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.companyService.createUserAndCompany(data);
  }

  @Roles(Role.ADMIN)
  @Get('all')
  async getAllCompanies(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.companyService.getAllCompanies(Number(page), Number(limit));
  }

  @Roles(Role.ADMIN)
  @Get(':companyId')
  async getCompanyById(@Param('companyId') companyId: string) {
    return this.companyService.getCompanyById(companyId);
  }

  @Roles(Role.COMPANY)
  @Delete("me")
  async deleteMyCompany(@Request() req: Express.Request) {
    return this.companyService.deleteCompany(req['auth'].company._id);
  }

  @Roles(Role.ADMIN)
  @Delete(':companyId')
  async deleteCompany(@Param('companyId') companyId: string) {
    return this.companyService.deleteCompany(companyId);
  }
}
