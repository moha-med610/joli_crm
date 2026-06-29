import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery: true,
})
export class Product extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Company' })
  companyId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  categoryId!: Types.ObjectId;

  @Prop({ required: true, type: String })
  imageUrl!: string;

  @Prop({ required: true, type: String })
  imagePublicUrl!: string;

  @Prop({ required: true, index: true, type: String })
  productName!: string;

  @Prop({ required: true, type: Types.Decimal128 })
  productPrice!: Types.Decimal128;

  @Prop({ type: String, required: true })
  productDescription!: string;

  @Prop({ type: String, required: true })
  productSize!: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);

export const ProductModel = MongooseModule.forFeature([
  { name: Product.name, schema: ProductsSchema },
]);
