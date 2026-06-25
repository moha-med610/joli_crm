import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery: true,
})
export class Category extends Document {
  @Prop({ required: true, type: String, unique: true })
  categoryName!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CategoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: CategorySchema },
]);
