import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Optional,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/userRole.enum';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Roles(Role.COMPANY)
@UseGuards(AuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Post('add-category')
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.productsService.createCategory(data);
  }

  @Roles(Role.ADMIN, Role.COMPANY)
  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get('')
  async getProducts(
    @Req() req: Express.Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.productsService.getProducts(req['auth'], page, limit);
  }

  @Post()
  @UseInterceptors(FileInterceptor('productImage'))
  async createProduct(
    @Req() req: Express.Request,
    @Body() data: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.createProduct(file, req['auth'], data);
  }

  @Get(':productId')
  async getProductById(
    @Req() req: Express.Request,
    @Param('productId') productId: string,
  ) {
    return this.productsService.getProductById(req['auth'], productId);
  }

  @Patch('update/:productId')
  @UseInterceptors(FileInterceptor('newProductImage'))
  async updateProduct(
    @Req() req: Express.Request,
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.updateProduct(
      file,
      req['auth'],
      data,
      productId,
    );
  }

  @Delete('delete/:productId')
  async deleteProduct(
    @Req() req: Express.Request,
    @Param('productId') productId: string,
  ) {
    return this.productsService.deleteProduct(req['auth'], productId);
  }
}
