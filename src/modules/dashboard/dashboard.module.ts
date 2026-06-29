import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyModel } from '../company/schema/company.schema';
import { CustomerModel } from '../customers/schema/customers.schema';
import { ProductModel } from '../products/schema/products.schema';
import { EncryptionModule } from 'src/common/modules/encryption/encryption.module';
import { TokenModule } from 'src/common/modules/token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModel,
    CompanyModel,
    CustomerModel,
    ProductModel,
    EncryptionModule,
    TokenModule,
    ConfigModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
