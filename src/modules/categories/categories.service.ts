import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}
  async createCategory(data: CreateCategoryDto) {
    const { categoryName } = data;
    const isCategoryExist = await this.categoryModel.findOne({ categoryName });
    if (isCategoryExist) {
      throw new BadRequestException('This Category Already Exist');
    }

    const category = await this.categoryModel.create({
      categoryName,
    });

    await this.cache.clear();

    return {
      msg: 'Category Created Successfully',
      data: {
        category,
      },
    };
  }

  async getCategories() {
    const categories = await this.categoryModel.find();

    return {
      msg: 'Categories Received Successfully',
      data: categories,
    };
  }
}
