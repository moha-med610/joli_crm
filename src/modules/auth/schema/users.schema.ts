import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enums/userRole.enum';
import { EncryptionService } from 'src/modules/encryption/encryption.service';

export type UsersDocument = HydratedDocument<User>;

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
  companyName!: string;

  @Prop({ required: true, index: true })
  location!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ enum: Role, default: Role.COMPANY })
  role!: Role;

  @Prop({ default: 0 })
  tokenVersion!: number;
}
export const Users = SchemaFactory.createForClass(User);
