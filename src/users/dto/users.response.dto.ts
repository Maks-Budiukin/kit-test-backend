import { IsString, IsEmail } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import {  Types } from 'mongoose';

export class UserResponseDto {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsString()
  _id: Types.ObjectId;

  @ApiResponseProperty({
    example: 'Bob Marley',
  })
  @IsString()
  name: string;

  @ApiResponseProperty({
    example: 'bobmarley@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiResponseProperty({
    example: 'k435bbk345bk.353nnwnfnn5nnl25nl.nn25l25j33jj3',
  })
  token: string;

}
