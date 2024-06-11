import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.model';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  @Prop()
  name: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  participants: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
