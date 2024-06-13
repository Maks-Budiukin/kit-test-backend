import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, ObjectId, Types } from 'mongoose';
import { User } from 'src/users/users.model';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  _id?: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  participants: ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
