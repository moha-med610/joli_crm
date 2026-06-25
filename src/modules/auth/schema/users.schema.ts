import { Schema, Prop, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enums/userRole.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  strict: true,
  strictQuery: true,
})
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ enum: Role, default: Role.COMPANY })
  role!: Role;

  @Prop({ default: 0 })
  tokenVersion!: number;

  @Prop({ default: false })
  hasCompany!: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
