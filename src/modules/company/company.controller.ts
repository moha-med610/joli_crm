import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/userRole.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateCompanyDto } from './dto/company.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create-company')
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.companyService.createCompany(data);
  }

  @Get('all')
  async getAllCompanies(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.companyService.getAllCompanies(Number(page), Number(limit));
  }

  @Get(':companyId')
  async getCompanyById(@Param('companyId') companyId: string) {
    return this.companyService.getCompanyById(companyId);
  }

  @Delete(':companyId')
  async deleteCompany(@Param('companyId') companyId: string) {
    return this.companyService.deleteCompany(companyId);
  }
}
