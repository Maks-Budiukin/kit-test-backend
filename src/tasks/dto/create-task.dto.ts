import { IsString, IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { TaskStatus } from './task-status';

export class TaskCreateDto {
  @ApiProperty({
    example: 'Super Difficult Task',
    description: "Task description",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '64e7b40704f6b0d4d0440b26',
    description: "Project associated with the Task",
  })
  @IsMongoId()
  project: ObjectId;

  @ApiPropertyOptional({
    example: 'DONE',
    description: "Task status",
  })
  @IsEnum(TaskStatus)
  // @IsString()
  status: TaskStatus;

  @ApiPropertyOptional({
    example: '64e7b40704f6b0d4d0440b26',
    description: "Task assignee",
  })
  @IsMongoId()
  assignee?: ObjectId;
}
