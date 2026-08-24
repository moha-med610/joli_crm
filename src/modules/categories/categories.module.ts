import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryModel } from './schema/category.schema';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyModel } from '../company/schema/company.schema';
import { TokenModule } from 'src/common/modules/token/token.module';
import { EncryptionModule } from 'src/common/modules/encryption/encryption.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModel,
    CompanyModel,
    TokenModule,
    EncryptionModule,
    ConfigModule,
    CategoryModel,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
