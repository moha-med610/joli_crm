import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'src/common/modules/cloudinary/cloudinary.module';
import { EncryptionModule } from 'src/common/modules/encryption/encryption.module';
import { TokenModule } from 'src/common/modules/token/token.module';
import { UserModel } from '../auth/schema/users.schema';
import { CompanyModel } from '../company/schema/company.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryModel } from './schema/category.schema';
import { ProductModel } from './schema/products.schema';

@Module({
  imports: [
    ProductModel,
    CategoryModel,
    UserModel,
    CompanyModel,
    EncryptionModule,
    TokenModule,
    ConfigModule,
    CloudinaryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
