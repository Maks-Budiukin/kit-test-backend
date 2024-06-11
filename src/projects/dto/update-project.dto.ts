import { IsOptional, IsString, IsMongoId } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ProjectUpdateDto {
  @ApiPropertyOptional({
    example: 'Very Important Project',
    description: "Project's name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: ['64e7b40704f6b0d4d0440b26'],
    description: "Projects's participants",
  })
  @IsMongoId({each: true})
  participants?: ObjectId[];
}
