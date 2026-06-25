import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CustomersDocument = HydratedDocument<Customer>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery: true,
})
export class Customer {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId!: Types.ObjectId;

  @Prop({ required: true, index: true })
  name!: string;

  @Prop({ required: true, index: true })
  phone!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  city!: string;

  @Prop({})
  whatsapp?: string;

  @Prop()
  notes?: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customer);

export const CustomerModel = MongooseModule.forFeature([
  { name: Customer.name, schema: CustomersSchema },
]);
