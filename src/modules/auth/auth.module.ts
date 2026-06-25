import { Module } from '@nestjs/common';
import { EmailsModule } from '../../common/modules/emails/emails.module';
import { EncryptionModule } from '../../common/modules/encryption/encryption.module';
import { TokenModule } from '../../common/modules/token/token.module';
import { CompanyModel } from '../company/schema/company.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from './schema/users.schema';

@Module({
  imports: [
    UserModel,
    CompanyModel,
    TokenModule,
    EncryptionModule,
    EmailsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
