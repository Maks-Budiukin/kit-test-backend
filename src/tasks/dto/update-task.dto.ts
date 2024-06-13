import { IsString, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { TaskStatus } from './task-status';

export class TaskUpdateDto {
  @ApiPropertyOptional({
    example: 'Super Difficult Task',
    description: "Task description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'DONE',
    description: "Task status",
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: '64e7b40704f6b0d4d0440b26',
    description: "Task assignee ID",
  })
  @IsOptional()
  @IsMongoId()
  assignee?: ObjectId;
}
