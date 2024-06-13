import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectCreateDto {
  @ApiProperty({
    example: 'Very Important Project',
    description: "Projects's name",
  })
  @IsString()
  name: string;
}
