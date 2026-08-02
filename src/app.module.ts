import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CompanyModule } from './modules/company/company.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CloudinaryModule } from './common/modules/cloudinary/cloudinary.module';
import { NodeEnvEnum } from './common/enums/nodeEnv.enum';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDb Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri:
            Number(process.env.NODE_ENV) === NodeEnvEnum.PRODUCTION
              ? process.env.MONGO_URI_PROD
              : process.env.MONGO_URI_DEV,
        };
      },
    }),

    // Cache Configuration
    CacheModule.register({
      isGlobal: true,
      ttl: 10 * 60 * 1000,
    }),

    // Features
    AuthModule,
    CustomersModule,
    OrdersModule,
    InventoryModule,
    InvoicesModule,
    ProductsModule,
    CompanyModule,
    DashboardModule,
    CloudinaryModule,
    CategoriesModule,
  ],
})
export class AppModule {}
