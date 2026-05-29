import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { TokenModule } from '../token/token.module';
import { EncryptionModule } from '../encryption/encryption.module';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: Users }]),
    TokenModule,
    EncryptionModule,
    EmailsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
