import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { CreateCategoryDto } from './dto/category.dto';
import { authData } from 'src/common/types/authData.type';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { DbRepo } from 'src/repos/db.repo';

@Injectable()
export class ProductsService extends DbRepo<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {
    super(productModel);
  }

  async createCategory(data: CreateCategoryDto) {
    const { categoryName } = data;
    const isCategoryExist = await this.categoryModel.findOne({ categoryName });
    if (isCategoryExist) {
      throw new BadRequestException('This Category Already Exist');
    }

    const category = await this.categoryModel.create({
      categoryName,
    });

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
      data: {
        categories,
      },
    };
  }

  async createProduct(auth: authData, data: CreateProductDto) {
    const companyId = auth.company._id;
    const {
      categoryId,
      productName,
      productDescription,
      productPrice,
      productSize,
    } = data;

    const newProduct = await this.productModel.create({
      companyId,
      categoryId,
      productName,
      productDescription,
      productPrice,
      productSize,
    });

    return {
      msg: 'Product Created Successfully',
      data: {
        product: newProduct,
      },
    };
  }

  async getProducts(auth: authData, page: number, limit: number) {
    const companyId = auth.company._id;

    const products = await this.findWithPagination({
      filter: { companyId },
      page: page,
      limit: limit,
      path: 'categoryId',
      select: '_id categoryName',
    });

    return {
      msg: 'Products Received Successfully',
      data: {
        products,
      },
    };
  }

  async getProductById(auth: authData, productId: string) {
    const companyId = auth.company._id;

    const product = await this.productModel
      .findOne({
        companyId,
        _id: productId,
      })
      .populate('categoryId', '_id categoryName');
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return {
      msg: 'Product Receive Successfully',
      data: {
        product,
      },
    };
  }

  async updateProduct(
    auth: authData,
    data: UpdateProductDto,
    productId: string,
  ) {
    const companyId = auth.company._id;
    const {
      categoryId,
      productName,
      productDescription,
      productPrice,
      productSize,
    } = data;

    const product = await this.productModel
      .findOneAndUpdate(
        {
          companyId,
          _id: productId,
        },
        {
          categoryId,
          productName,
          productDescription,
          productPrice,
          productSize,
        },
        {
          returnDocument: 'after',
        },
      )
      .populate('categoryId', '_id categoryName');
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return {
      msg: 'Product Updated Successfully',
      data: {
        product,
      },
    };
  }

  async deleteProduct(auth: authData, productId: string) {
    const companyId = auth.company._id;

    const product = await this.productModel.findOneAndDelete({
      companyId,
      _id: productId,
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return {
      msg: 'Product Deleted Successfully',
      data: {},
    };
  }
}
