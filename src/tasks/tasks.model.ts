import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Project } from 'src/projects/projects.model';
import { User } from 'src/users/users.model';
import { TaskStatus } from './dto/task-status';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  _id?: ObjectId;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: ObjectId;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  assignee: ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
