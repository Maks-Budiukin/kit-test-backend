import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/users.model';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  participants: ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
