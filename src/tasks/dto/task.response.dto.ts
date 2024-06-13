import { IsMongoId, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { TaskStatus } from './task-status';

export class TaskResponseDto {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsString()
  _id: ObjectId;

  @ApiResponseProperty({
    example: 'Super Difficult Task',
  })
  @IsString()
  description: string;

  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsMongoId()
  project: ObjectId;

  @ApiResponseProperty({
    example: 'DONE',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  @IsString()
  status?: TaskStatus;

  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsOptional()
  @IsMongoId()
  assignee?: ObjectId;
}
