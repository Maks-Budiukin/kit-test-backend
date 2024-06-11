import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);