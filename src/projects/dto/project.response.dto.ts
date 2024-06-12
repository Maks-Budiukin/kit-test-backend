import { IsMongoId, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ProjectResponseDto {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsString()
  _id: ObjectId;

  @ApiResponseProperty({
    example: 'Very Important Project',
  })
  @IsString()
  name: string;

  @ApiResponseProperty({
    example: ['64e7b40704f6b0d4d0440b26'],
  })
  @IsMongoId({each: true})
  participants: ObjectId[];
}
