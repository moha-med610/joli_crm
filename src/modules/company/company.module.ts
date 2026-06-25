import { Module } from '@nestjs/common';
import { EncryptionModule } from '../../common/modules/encryption/encryption.module';
import { TokenModule } from '../../common/modules/token/token.module';
import { AuthModule } from '../auth/auth.module';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyModel } from './schema/company.schema';

@Module({
  imports: [UserModel, CompanyModel, TokenModule, EncryptionModule, AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
