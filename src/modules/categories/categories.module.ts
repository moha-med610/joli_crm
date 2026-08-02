import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryModel } from './schema/category.schema';

@Module({
  imports: [CategoryModel],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
