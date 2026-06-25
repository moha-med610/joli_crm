import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryModel } from './schema/category.schema';
import { ProductModel } from './schema/products.schema';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyModel } from '../company/schema/company.schema';
import { EncryptionModule } from 'src/common/modules/encryption/encryption.module';
import { TokenModule } from 'src/common/modules/token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModel,
    CategoryModel,
    UserModel,
    CompanyModel,
    EncryptionModule,
    TokenModule,
    ConfigModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
