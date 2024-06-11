import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ProjectCreateDto {
  @ApiProperty({
    example: 'Very Important Project',
    description: "Projects's name",
  })
  @IsString()
  name: string;
}
