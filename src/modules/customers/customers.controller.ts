import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/userRole.enum';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CustomerDecryptInterceptor } from 'src/common/interceptor/customerDecrypt.interceptor';

@Roles(Role.COMPANY)
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(CustomerDecryptInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getCustomers(
    @Request() req: Express.Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.customersService.getCustomers(req['auth'], page, limit);
  }

  @Get('search')
  async searchCustomers(
    @Request() req: Express.Request,
    @Query('name') name: string,
  ) {
    return this.customersService.searchCustomers(req['auth'], name);
  }

  @Get(':customerId')
  async getCustomerById(
    @Param('customerId') customerId: string,
    @Request() req: Express.Request,
  ) {
    return this.customersService.getCustomerById(req['auth'], customerId);
  }

  @Post()
  async createCustomer(
    @Request() req: Express.Request,
    @Body() data: CreateCustomerDto,
  ) {
    return this.customersService.createCustomer(req['auth'], data);
  }

  @Patch(':customerId')
  async updateCustomer(
    @Request() req: Express.Request,
    @Param('customerId') customerId: string,
    @Body() data: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(req['auth'], customerId, data);
  }

  @Delete(':customerId')
  async deleteCustomer(
    @Request() req: Express.Request,
    @Param('customerId') customerId: string,
  ) {
    return this.customersService.deleteCustomer(req['auth'], customerId);
  }
}
