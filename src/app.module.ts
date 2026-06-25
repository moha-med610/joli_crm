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
        return { uri: 'mongodb://localhost:27017/joli_crm' };
        // config.get<string>('MONGO_URI')
      },
    }),

    // Cache Configuration
    CacheModule.register({
      isGlobal: true,
    }),

    // Features
    AuthModule,
    CustomersModule,
    OrdersModule,
    InventoryModule,
    InvoicesModule,
    ProductsModule,
    CompanyModule,
  ],
})
export class AppModule {}
