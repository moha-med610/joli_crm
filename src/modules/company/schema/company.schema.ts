import { Schema, Prop, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery: true,
})
export class Company {
  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  user!: Types.ObjectId;

  @Prop({ required: true })
  companyName!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  city!: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export const CompanyModel = MongooseModule.forFeature([
  { name: Company.name, schema: CompanySchema },
]);
