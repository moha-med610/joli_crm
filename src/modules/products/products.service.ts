import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/common/modules/cloudinary/cloudinary.service';
import { authData } from 'src/common/types/authData.type';
import { DbRepo } from 'src/repos/db.repo';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { Category } from './schema/category.schema';
import { Product } from './schema/products.schema';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ProductsService extends DbRepo<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly cloudinaryService: CloudinaryService,
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

  async createProduct(
    file: Express.Multer.File,
    auth: authData,
    data: CreateProductDto,
  ) {
    const companyId = auth.company._id;
    const {
      categoryId,
      productName,
      productDescription,
      productPrice,
      productSize,
    } = data;

    const image = await this.cloudinaryService.upload(file, 'products');

    const newProduct = await this.productModel.create({
      imageUrl: image.secure_url,
      imagePublicUrl: image.public_id,
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
    file: Express.Multer.File,
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

    const product = await this.productModel.findOne({
      companyId,
      _id: productId,
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    let image: UploadApiResponse | null = null;

    if (file) {
      image = await this.cloudinaryService.upload(file, 'products');

      await this.cloudinaryService.delete(product.imagePublicUrl);
    }

    const updateData: Record<string, any> = {
      categoryId,
      productName,
      productDescription,
      productPrice,
      productSize,
    };

    if (image) {
      updateData.imageUrl = image.secure_url;
      updateData.imagePublicUrl = image.public_id;
    }

    const updatedProduct = await this.productModel.findOneAndUpdate(
      {
        _id: productId,
        companyId,
      },
      updateData,
      {
        returnDocument: 'after',
      },
    );

    return {
      msg: 'Product Updated Successfully',
      data: {
        product: updatedProduct,
      },
    };
  }

  async deleteProduct(auth: authData, productId: string) {
    const companyId = auth.company._id;

    const product = await this.productModel.findOne({
      companyId,
      _id: productId,
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    await this.cloudinaryService.delete(product.imagePublicUrl);

    await this.productModel.deleteOne({ _id: product._id });

    return {
      msg: 'Product Deleted Successfully',
      data: {},
    };
  }
}
