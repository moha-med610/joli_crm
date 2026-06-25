import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from '../../common/modules/encryption/encryption.module';
import { TokenModule } from '../../common/modules/token/token.module';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyModel } from '../company/schema/company.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerModel } from './schema/customers.schema';

@Module({
  imports: [
    UserModel,
    CompanyModel,
    CustomerModel,
    EncryptionModule,
    TokenModule,
    ConfigModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
